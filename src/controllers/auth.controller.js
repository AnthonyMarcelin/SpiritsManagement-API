import argon2 from "argon2";
import User from "../models/user.model.js";

const authController = {
	register: async (req, res) => {
		try {
			const { pseudo, firstname, lastname, email, password, isAdmin } = req.body;
			if (!pseudo || !firstname || !lastname || !email || !password || typeof isAdmin === 'undefined') {
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
				isAdmin
			});
			return res.status(201).json(newUser);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				return res.status(400).json({ message: "email and password required" });
			}
			const user = await User.findOne({ where: { email } });
			if (!user) {
				return res.status(404).json({ message: "user not found" });
			}
			if (!user.password) {
				return res.status(400).json({ message: "wrong password" });
			}
			const isPasswordValid = await argon2.verify(user.password, password);
			if (!isPasswordValid) {
				return res.status(401).json({ message: "password or email incorrect" });
			}
			return res.status(200).json({
				user: {
					id: user.id,
					pseudo: user.pseudo,
					email: user.email,
					firstname: user.firstname,
					lastname: user.lastname
				}
			});
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};

export default authController;
