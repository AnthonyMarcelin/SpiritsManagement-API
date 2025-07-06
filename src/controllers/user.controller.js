import User from "../models/user.model.js";

const userController = {
  getAllUser: async (req, res) => {
    try {
      const user = await User.findAll();

      if (!user) {
        return res.status(400).json({ message: "Aucun utilisateur connu" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findByPK(req.parama.id);

      if (!user) {
        return res.status(400).json({ message: "Utilisateur non trouve" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createUser: async (req, res) => {
    try {
      const { pseudo, firstname, lastname, email, password, isAdmin } =
        req.body;

      const newUser = await User.create({
        pseudo,
        firstname,
        lastname,
        email,
        password,
        isAdmin,
      });

      if ((!pseudo, !firstname, !lastname, !email, !password, !isAdmin)) {
        res.status(400).json({ error: "Missing body parameter" });
      } else {
        res.status(201).json(newUser);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { pseudo, firstname, lastname, email, password, isAdmin } =
        req.body;

      const user = await User.update({
        pseudo,
        firstname,
        lastname,
        email,
        password,
        isAdmin,
      });

      if ((!pseudo, !firstname, !lastname, !email, !password, !isAdmin)) {
        res.status(400).json({ error: "Missing body parameter" });
      } else {
        res.status(201).json(user);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "Not found" });
      await user.destroy();
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default userController;
