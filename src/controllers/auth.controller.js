import argon2 from "argon2";

import User from "../models/user.model.js";

const authController = {
	register: async (req, res) => {
try {
	const { pseudo, firstname, lastname, email, password, isAdmin } = req.body;
		  if (!pseudo || !firstname || !lastname || !email || !password || typeof isAdmin === 'undefined') {
			return res.status(400).json({ error: "Missing body parameter" });
		  }

const existingUser = await User.findOne({where: {email}});

if(existingUser) {
	return res.status(409).json({ error: "User already exists"})
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

return res.status(201).json(newUser)

		} catch (error) {
	      return res.status(500).json({ error: error.message });
}
	},
}

export default authController;
