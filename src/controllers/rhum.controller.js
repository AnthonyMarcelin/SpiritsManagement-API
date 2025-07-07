import Rhum from "../models/rhum.model.js";
import Type from "../models/type.model.js";

const rhumController = {
  getAllRhum: async (req, res) => {
    try {
      const rhums = await Rhum.findAll({ where: { userId: req.user.id } });
      if (!rhums || rhums.length === 0) {
        return res.status(404).json({ message: "Aucun rhum disponible" });
      }
      return res.status(200).json(rhums);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getRhumById: async (req, res) => {
    try {
      const { id } = req.params;
      const rhum = await Rhum.findOne({ where: { id, userId: req.user.id } });
      if (!rhum) {
        return res.status(404).json({ message: "Rhum non trouvé" });
      }
      return res.status(200).json(rhum);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  createRhum: async (req, res) => {
    try {
      const { name, description, review, gender, price, origin } = req.body;
      if (!name || !description || !gender || !price || !origin) {
        return res.status(400).json({ error: "Champs obligatoires manquants pour la création d'un rhum." });
      }
      let photoPath = null;
      if (req.file) {
        photoPath = req.file.path;
      }
      const newRhum = await Rhum.create({
        name,
        description,
        review,
        gender,
        price,
        origin,
        photo: photoPath,
        userId: req.user.id,
      });
      return res.status(201).json(newRhum);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateRhum: async (req, res) => {
    try {
      const { id } = req.params;
      const rhum = await Rhum.findOne({ where: { id, userId: req.user.id } });
      if (!rhum) {
        return res.status(404).json({ message: "Rhum non trouvé" });
      }
      const { name, description, review, gender, price, origin } = req.body;
      const updateData = {};
      if (typeof name !== 'undefined') updateData.name = name;
      if (typeof description !== 'undefined') updateData.description = description;
      if (typeof review !== 'undefined') updateData.review = review;
      if (typeof gender !== 'undefined') updateData.gender = gender;
      if (typeof price !== 'undefined') updateData.price = price;
      if (typeof origin !== 'undefined') updateData.origin = origin;
      if (req.file) {
        updateData.photo = req.file.path;
      }
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "Aucune donnée à mettre à jour." });
      }
      await rhum.update(updateData);
      return res.status(200).json(rhum);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteRhum: async (req, res) => {
    try {
      const { id } = req.params;
      const rhum = await Rhum.findOne({ where: { id, userId: req.user.id } });
      if (!rhum) {
        return res.status(404).json({ message: "Rhum non trouvé" });
      }
      await rhum.destroy();
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getRhumTypes: async (req, res) => {
    try {
      const types = await Type.findAll({ where: { for_rhum: true } });
      return res.status(200).json(types);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

export default rhumController;
