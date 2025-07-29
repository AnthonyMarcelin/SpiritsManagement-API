import Whisky from "../models/whisky.model.js";
import Type from "../models/type.model.js";
import sequelize from "../database/client.js";

const whiskyController = {
  getAllWhisky: async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Utilisateur non authentifié" });
      }
      const whisky = await Whisky.findAll({ where: { userId: req.user.id } });
      if (!whisky || whisky.length === 0) {
        return res.status(404).json({ message: "Aucun whisky disponible" });
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
      console.log("[WHISKY] Création demandée par :", req.user);
      console.log("[WHISKY] Body reçu :", req.body);
      const {
        name,
        description,
        review,
        price,
        labelId,
        origin,
        supplier,
        peatLevelId,
        typeId,
        note
      } = req.body;
      if (!name || !description || !price || !labelId || !origin || !supplier || !peatLevelId || !typeId) {
        console.log("[WHISKY] Champs obligatoires manquants !");
        return res.status(400).json({ error: "Champs obligatoires manquants pour la création d'un whisky." });
      }

      // Uniqueness check: ensures that each user can only have one whisky with the same name in their own collection.
      // This allows different users to have whiskies with the same name (e.g., Aberlour) without conflict.
      const whiskyNameNorm = name.trim();
      const existingWhisky = await Whisky.findOne({
        where: {
          name: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('name')),
            whiskyNameNorm.toLowerCase()
          ),
          userId: req.user.id
        }
      });
      if (existingWhisky) {
        return res.status(409).json({ error: "Un whisky avec ce nom existe déjà dans votre collection.", whisky: existingWhisky });
      }

      let finalLabelId = labelId;
      if (!finalLabelId || Number.isNaN(Number(finalLabelId))) {
        const Label = (await import("../models/label.model.js")).default;
        const labelNameRaw = req.body.labelName || labelId;
        const labelName = labelNameRaw.trim();
        let label = await Label.findOne({
          where: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('name')),
            labelName.toLowerCase()
          )
        });
        if (!label) {
          label = await Label.create({ name: labelName });
        }
        finalLabelId = label.id;
      }
      let finalOriginId = null; // Initialize finalOriginId
      const Origin = (await import("../models/origin.model.js")).default;
      // Association ou création de l'origine à partir du champ texte
      let originObj = await Origin.findOne({
        where: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('country')),
          origin.trim().toLowerCase()
        )
      });
      if (!originObj) {
        originObj = await Origin.create({ country: origin.trim() });
        console.log(`[WHISKY] Nouvelle origin créée: ${origin.trim()}`);
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
        console.log(`[WHISKY] Nouveau supplier créé: ${supplier.trim()}`);
      }
      const finalSupplierId = supplierObj.id;

      const photoPath = req.body.photo || (req.file ? req.file.path : null);
      const newWhisky = await Whisky.create({
        name,
        description,
        review,
        price,
        labelId: finalLabelId,
        originId: finalOriginId,
        supplierId: finalSupplierId,
        peatLevelId,
        typeId,
        note,
        photo: photoPath,
        userId: req.user.id,
      });
      console.log("[WHISKY] Whisky créé :", newWhisky);
      return res.status(201).json(newWhisky);
    } catch (error) {
      console.error("[WHISKY] Erreur création whisky :", error);
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
        note
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
      if (typeof note !== 'undefined') updateData.note = note;
      if (typeof req.body.photo !== 'undefined') {
        updateData.photo = req.body.photo;
      } else if (req.file) {
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
