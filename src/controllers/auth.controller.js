import argon2 from "argon2";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { sendPasswordResetEmail, sendVerificationEmail, sendPasswordChangeConfirmation } from "../utils/nodemailer/authEmailService.js";
import verificationToken from "../utils/verificationToken.js";



const jwtSecretKey = process.env.JWT_SECRET;

const authController = {
register: async (req, res) => {
	try {
		const { pseudo, firstname, lastname, email, password } = req.body;

			if (!pseudo || !firstname || !lastname || !email || !password) {
				return res.status(400).json({ error: "Missing body parameter" });
			}

			const existingUser = await User.findOne({ where: { email } });

			if (existingUser) {
				return res.status(409).json({ error: "User already exists" });
			}

			const hashedPassword = await argon2.hash(password);
			const emailVerificationToken = verificationToken.generateVerificationToken();

			const newUser = await User.create({
				pseudo,
				firstname,
				lastname,
				email,
				password: hashedPassword,
				isAdmin: false,
				isVerified: false,
				verificationToken: emailVerificationToken,
			});

			await sendVerificationEmail(email, firstname, emailVerificationToken);


	  // Don't return password
	  const userObj = newUser.get({ plain: true });
	  delete userObj.password;
	  delete userObj.verificationToken;
	  return res.status(201).json({ message: "Inscription succeed, please verify your email to activate your account.",
 user: userObj });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	verifyEmail: async (req, res) => {
		try {

			const {token} = req.query;

			if (!token) {
				return res.status(400).json({ error: "Token is required" });
			}

			const user = await User.findOne({ where: { verificationToken: token } });

			if (!user) {
				return res.status(404).json({ error: "invalid verification token" });
			}

			if (user.isVerified) {
				return res.status(200).json({ message: "Email déjà vérifié" });
			}

			await user.update({
				isVerified: true,
				verificationToken: null
			});

			return res.status(200).json({ message: "Email vérifié avec succès" });

		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

		resendVerification: async (req, res) => {
		try {

			const { email } = req.body;

			if (!email) {
				return res.status(400).json({ error: "Email is required" });
			}
			const user = await User.findOne({ where: { email } });

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			if (user.isVerified) {
				return res.status(400).json({ error: "Account already verified" });
			}

			const newToken = verificationToken.generateVerificationToken();
			await user.update({ verificationToken: newToken });
			await sendVerificationEmail(user.email, user.firstname, newToken);

			return res.status(200).json({ message: "Verification email resent" });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	forgotPassword: async (req, res) => {
		try {
			const {email} = req.body;

			if (!email) {
				return res.status(400).json({error: "require email"})
			}

			const user = await User.findOne({where: {email}});

			if (!user) {
				return res.status(200).json({message: "If email exists, you will receive an email"})
			}

			const resetToken = verificationToken.generateResetPasswordToken();
			const resetExpires = new Date(Date.now() + 3600000); // 1 hour


			await user.update({
				resetPasswordToken: resetToken,
				resetPasswordExpires: resetExpires
			});

			await sendPasswordResetEmail(email, resetToken);

			return res.status(200).json({ message: "If email exists, you will receive an email" });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	resetPassword: async (req, res) => {
		try {
			const { token, newPassword } = req.body;

			if (!token || !newPassword) {
				return res.status(400).json({ error: "Token and new password are required" });
			}

			const user = await User.findOne({
				where: {
					resetPasswordToken: token,
					resetPasswordExpires: {
						[User.sequelize.Sequelize.Op.gt]: new Date() // Check validity token
					}
				}
			});

			if (!user) {
				return res.status(404).json({ error: "Invalid or expired reset token" });
			}

			const hashedPassword = await argon2.hash(newPassword);

			await user.update({
				password: hashedPassword,
				resetPasswordToken: null,
				resetPasswordExpires: null
			});

			// send confirmation email
			await sendPasswordChangeConfirmation(user.email, user.firstname);

			return res.status(200).json({ message: "Password reset successfully" });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	login: async (req, res) => {
		try {

			const { email, password } = req.body;

			if (!email || !password) {
				return res.status(400).json({ error: "email and password required" });
			}

			const user = await User.findOne({ where: { email } });

			if (!user) {
				return res.status(404).json({ error: "user not found" });
			}

			// User non verified cannot login
			if (!user.isVerified) {
				return res.status(403).json({ error: "Email not verified" });
			}

			if (!user.password) {
				return res.status(400).json({ error: "wrong password" });
			}
			const isPasswordValid = await argon2.verify(user.password, password);

			if (!isPasswordValid) {
				return res.status(401).json({ error: "password or email incorrect" });
			}

			const token = jwt.sign(
				{
					id: user.id,
					email: user.email,
					isAdmin: user.isAdmin,
					isVerified: user.isVerified
				},
				jwtSecretKey,
				{
					expiresIn: "1h",
				},
			);

			res.cookie("accessToken", token, {
				httpOnly:true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				path: "/",
				maxAge: 60 * 60 * 1000,
			});


	  const userObj = user.get({ plain: true });
	  delete userObj.password;

	  return res.status(200).json({ user: userObj, token });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	logout: async (req, res) => {

		res.clearCookie("accessToken", {
			httpOnly: true,
			sameSite: "strict",
		});

		return res.status(200).json({ message: "Déconnexion réussie" });
	},

	me: async (req, res) => {
		try {

		// Fetch the full user from the database
		const user = await User.findByPk(req.user.id, {
			attributes: { exclude: ['password', 'verificationToken', 'resetPasswordToken', 'resetPasswordExpires'] }
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.json(user);

		} catch (error) {
		res.status(500).json({ error: "Error while retrieving profile" });
		}
	},

updateMe: async (req, res) => {
	try {

		const user = await User.findByPk(req.user.id);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		await user.update(req.body);

		res.json({ message: 'Profile updated successfully', user: user.get({ plain: true }) });

	} catch (error) {

		res.status(500).json({ error: 'Error while updating profile' });
	}
},

deleteMe: async (req, res) => {
	try {

		const user = await User.findByPk(req.user.id);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}
		await user.destroy();

		res.clearCookie("accessToken", {
			httpOnly: true,
			sameSite: "strict",
		});

		res.json({ message: 'Account deleted successfully' });

	} catch (error) {
		res.status(500).json({ error: 'Error while deleting account' });
	}
},

};

export default authController;
