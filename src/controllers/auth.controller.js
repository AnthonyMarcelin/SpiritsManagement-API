import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

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
			const newUser = await User.create({
				pseudo,
				firstname,
				lastname,
				email,
				password: hashedPassword,
				isAdmin: false // Par défaut, personne n'est admin à l'inscription
			});

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, isAdmin: newUser.isAdmin },
        jwtSecretKey,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 1000,
      });

	  // Don't return password
      const userObj = newUser.get({ plain: true });
      delete userObj.password;
      return res.status(201).json({ user: userObj, token });
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
			if (!user.password) {
				return res.status(400).json({ error: "wrong password" });
			}
			const isPasswordValid = await argon2.verify(user.password, password);
			if (!isPasswordValid) {
				return res.status(401).json({ error: "password or email incorrect" });
			}

			const token = jwt.sign(
				{id: user.id, email: user.email, isAdmin: user.isAdmin},
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

      // Ne jamais retourner le hash du mot de passe
      const userObj = user.get({ plain: true });
      delete userObj.password;
      return res.status(200).json({ user: userObj, token });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};

export default authController;
