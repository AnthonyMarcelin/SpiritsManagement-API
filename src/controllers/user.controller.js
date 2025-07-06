import User from "../models/user.model.js";

const userController = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.findAll();
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "Aucun utilisateur connu" });
      }
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { pseudo, firstname, lastname, email, password, isAdmin } = req.body;
      if (!pseudo || !firstname || !lastname || !email || !password || typeof isAdmin === 'undefined') {
        return res.status(400).json({ error: "Missing body parameter" });
      }
      const newUser = await User.create({
        pseudo,
        firstname,
        lastname,
        email,
        password,
        isAdmin,
      });
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      const { pseudo, firstname, lastname, email, password, isAdmin } = req.body;
      const updateData = {};
      if (typeof pseudo !== 'undefined') updateData.pseudo = pseudo;
      if (typeof firstname !== 'undefined') updateData.firstname = firstname;
      if (typeof lastname !== 'undefined') updateData.lastname = lastname;
      if (typeof email !== 'undefined') updateData.email = email;
      if (typeof password !== 'undefined') updateData.password = password;
      if (typeof isAdmin !== 'undefined') updateData.isAdmin = isAdmin;
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "Aucune donnée à mettre à jour." });
      }
      await user.update(updateData);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "Not found" });
      await user.destroy();
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default userController;
