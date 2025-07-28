import argon2 from "argon2";
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
      // Seul l'admin ou le user concerné peut voir
      if (!req.user.isAdmin && req.user.id !== Number(req.params.id)) {
        return res.status(403).json({ error: "Accès interdit" });
      }
      return res.status(200).json(user);
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
      if (!req.user.isAdmin && req.user.id !== Number(req.params.id)) {
        return res.status(403).json({ error: "Accès interdit" });
      }
        const { pseudo, firstname, lastname, email, password } = req.body;
      const updateData = {};
      if (typeof pseudo !== 'undefined') updateData.pseudo = pseudo;
      if (typeof firstname !== 'undefined') updateData.firstname = firstname;
      if (typeof lastname !== 'undefined') updateData.lastname = lastname;
      if (typeof email !== 'undefined') updateData.email = email;
      if (typeof password !== 'undefined') {
        updateData.password = await argon2.hash(password);
      }
      if (req.user.isAdmin && typeof req.body.isAdmin !== 'undefined') updateData.isAdmin = req.body.isAdmin;
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
      console.log('[USER] deleteUser - req.user:', req.user);
      const user = await User.findByPk(req.params.id);
      if (!user) {
        console.log('[USER] deleteUser - user not found:', req.params.id);
        return res.status(404).json({ error: "Not found" });
      }
      const isSelf = req.user.id === Number(req.params.id);
      console.log('[USER] deleteUser - isAdmin:', req.user.isAdmin, '| isSelf:', isSelf);
      if (!req.user.isAdmin && !isSelf) {
        console.log('[USER] deleteUser - accès interdit');
        return res.status(403).json({ error: "Accès interdit" });
      }
      if (req.user.isAdmin && isSelf) {
        console.log('[USER] deleteUser - admin ne peut pas se supprimer lui-même');
        return res.status(403).json({ error: "Un admin ne peut pas supprimer son propre compte" });
      }
      await user.destroy();
      console.log('[USER] deleteUser - user supprimé:', user.id);
      return res.status(204).end();
    } catch (error) {
      console.log('[USER] deleteUser - erreur:', error);
      return res.status(500).json({ error: error.message });
    }
  },
};

export default userController;
