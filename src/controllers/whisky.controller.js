import Whisky from "../models/whisky.model.js";
import Type from "../models/type.model.js";

const whiskyController = {
  getAllWhisky: async (req, res) => {
    try {
      const whisky = await Whisky.findAll({ where: { userId: req.user.id } });
      if (!whisky) {
        return res.status(400).json({ message: "Aucun whisky disponible" });
      }
      return res.status(200).json(whisky);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getWhiskyById: async (req, res) => {
    try {
      const whisky = await Whisky.findOne({ where: { id: req.params.id, userId: req.user.id } });
      if (!whisky) {
        return res.status(404).json({ error: "whisky non trouvé" });
      }
      return res.status(200).json(whisky);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  createWhisky: async (req, res) => {
    try {
      const {
        name,
        description,
        review,
        price,
        labelId,
        originId,
        supplierId,
        peatLevelId,
        typeId,
      } = req.body;
      if (!name || !description || !price || !labelId || !originId || !supplierId || !peatLevelId || !typeId) {
        return res.status(400).json({ error: "Champs obligatoires manquants pour la création d'un whisky." });
      }
      let photoPath = null;
      if (req.file) {
        photoPath = req.file.path;
      }
      const newWhisky = await Whisky.create({
        name,
        description,
        review,
        price,
        labelId,
        originId,
        supplierId,
        peatLevelId,
        typeId,
        photo: photoPath,
        userId: req.user.id, // Associer le whisky à l'utilisateur connecté
      });
      return res.status(201).json(newWhisky);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  },

  updateWhisky: async (req, res) => {
    try {
      const whisky = await Whisky.findByPk(req.params.id);
      if (!whisky) {
        return res.status(404).json({ error: "Whisky non trouvé" });
      }
      const {
        name,
        description,
        review,
        price,
        labelId,
        originId,
        supplierId,
        peatLevelId,
        typeId,
      } = req.body;
      const updateData = {};
      if (typeof name !== 'undefined') updateData.name = name;
      if (typeof description !== 'undefined') updateData.description = description;
      if (typeof review !== 'undefined') updateData.review = review;
      if (typeof price !== 'undefined') updateData.price = price;
      if (typeof labelId !== 'undefined') updateData.labelId = labelId;
      if (typeof originId !== 'undefined') updateData.originId = originId;
      if (typeof supplierId !== 'undefined') updateData.supplierId = supplierId;
      if (typeof peatLevelId !== 'undefined') updateData.peatLevelId = peatLevelId;
      if (typeof typeId !== 'undefined') updateData.typeId = typeId;
      if (req.file) {
        updateData.photo = req.file.path;
      }
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "Aucune donnée à mettre à jour." });
      }
      await whisky.update(updateData);
      return res.status(200).json(whisky);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Ajout d'une méthode pour obtenir les types de whisky facilement côté front
  getWhiskyTypes: async (req, res) => {
    try {
      const types = await Type.findAll({ where: { for_whisky: true } });
      res.status(200).json(types);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteWhisky: async (req, res) => {
    try {
      const whisky = await Whisky.findByPk(req.params.id);
      if (!whisky) {
        return res.status(404).json({ error: "Whisky non trouvé" });
      }
      await whisky.destroy();
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default whiskyController;
