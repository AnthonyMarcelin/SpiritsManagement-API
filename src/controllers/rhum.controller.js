import sequelize from "../database/client.js";
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
    console.log('[RHUM] req.body reçu:', req.body);

    try {
      const { name, description, review, price, labelId, origin, supplier, typeId, note } = req.body;
      if (!name || !description || !price || !labelId || !origin || !supplier || !typeId) {
        return res.status(400).json({ error: "Champs obligatoires manquants pour la création d'un rhum." });
      }

      // Uniqueness check: ensures that each user can only have one rum with the same name in their own collection.
      // This allows different users to have rums with the same name (e.g., Diplomatico) without conflict.
      const rhumNameNorm = name.trim();
      const existingRhum = await Rhum.findOne({
        where: {
          name: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('name')),
            rhumNameNorm.toLowerCase()
          ),
          userId: req.user.id
        }
      });
      if (existingRhum) {
        return res.status(409).json({ error: "Un rhum avec ce nom existe déjà dans votre collection.", rhum: existingRhum });
      }

      // Association ou création de l'origine à partir du champ texte
      let finalOriginId = null;
      const Origin = (await import("../models/origin.model.js")).default;
      let originObj = await Origin.findOne({
        where: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('country')),
          origin.trim().toLowerCase()
        )
      });
      if (!originObj) {
        originObj = await Origin.create({ country: origin.trim() });
        console.log(`[RHUM] Nouvelle origin créée: ${origin.trim()}`);
      }
      finalOriginId = originObj.id;

      // Association ou création du fournisseur à partir du champ texte
      const Supplier = (await import("../models/supplier.model.js")).default;
      let supplierObj = await Supplier.findOne({
        where: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('name')),
          supplier.trim().toLowerCase()
        )
      });
      if (!supplierObj) {
        supplierObj = await Supplier.create({ name: supplier.trim() });
        console.log(`[RHUM] Nouveau supplier créé: ${supplier.trim()}`);
      }
      const finalSupplierId = supplierObj.id;

      const photoPath = req.body.photo || (req.file ? req.file.path : null);
      const newRhum = await Rhum.create({
        name,
        description,
        review,
        price,
        labelId,
        originId: finalOriginId,
        supplierId: finalSupplierId,
        typeId,
        note,
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
      const { name, description, review, gender, price, origin, note } = req.body;
      const updateData = {};
      if (typeof name !== 'undefined') updateData.name = name;
      if (typeof description !== 'undefined') updateData.description = description;
      if (typeof review !== 'undefined') updateData.review = review;
      if (typeof gender !== 'undefined') updateData.gender = gender;
      if (typeof price !== 'undefined') updateData.price = price;
      if (typeof origin !== 'undefined') updateData.origin = origin;
      if (typeof note !== 'undefined') updateData.note = note;
      if (typeof req.body.photo !== 'undefined') {
        updateData.photo = req.body.photo;
      } else if (req.file) {
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
