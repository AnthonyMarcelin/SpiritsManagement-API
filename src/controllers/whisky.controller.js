import Whisky from "../models/whisky.model.js";
import Type from "../models/type.model.js";
import sequelize from "../database/client.js";
import Origin from "../models/origin.model.js";
import Supplier from "../models/supplier.model.js";
import Label from "../models/label.model.js";

import PeatLevel from "../models/peatLevel.model.js";

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
      const whisky = await Whisky.findOne({
        where: { id: req.params.id, userId: req.user.id },
        include: [
          { model: Origin, as: 'origin', attributes: ['country'] },
          { model: Supplier, as: 'supplier', attributes: ['name'] },
          { model: Label, as: 'label', attributes: ['name'] },
          { model: Type, as: 'type', attributes: ['name'] },
          { model: PeatLevel, as: 'peatLevel', attributes: ['name'] }
        ]
      });
      if (!whisky) {
        return res.status(404).json({ error: "Whisky non trouvé" });
      }
      const data = whisky.toJSON();
      data.origin = data.origin?.country || '';
      data.supplier = data.supplier?.name || '';
      data.label = data.label?.name || '';
      data.type = data.type?.name || '';
      data.peatLevel = data.peatLevel?.name || '';
      return res.status(200).json(data);
    } catch (error) {
      console.error('[WHISKY][GET BY ID] Erreur :', error);
      return res.status(500).json({ error: error.message, stack: error.stack });
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
      const whisky = await Whisky.findOne({
        where: { id: req.params.id, userId: req.user.id },
        include: [
          { model: Origin, as: 'origin', attributes: ['country'] },
          { model: Supplier, as: 'supplier', attributes: ['name'] },
          { model: Label, as: 'label', attributes: ['name'] },
          { model: Type, as: 'type', attributes: ['name'] },
          { model: PeatLevel, as: 'peatLevel', attributes: ['name'] }
        ]
      });
      if (!whisky) {
        return res.status(404).json({ error: "Whisky non trouvé" });
      }
      const updateData = {};
      ["name", "description", "review", "price", "labelId", "peatLevelId", "typeId", "note"].forEach(field => {
        if (typeof req.body[field] !== "undefined") updateData[field] = req.body[field];
      });
      // Gestion de la photo (URL ou fichier)
      if (typeof req.body.photo !== "undefined") {
        updateData.photo = req.body.photo;
      } else if (req.file) {
        updateData.photo = req.file.path;
      }
      // Gestion dynamique de origin
      if (typeof req.body.origin !== "undefined" && req.body.origin.trim() !== "") {
        let originObj = await Origin.findOne({
          where: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('country')),
            req.body.origin.trim().toLowerCase()
          )
        });
        if (!originObj) {
          originObj = await Origin.create({ country: req.body.origin.trim() });
        }
        updateData.originId = originObj.id;
      }
      // Gestion dynamique de supplier
      if (typeof req.body.supplier !== "undefined" && req.body.supplier.trim() !== "") {
        let supplierObj = await Supplier.findOne({
          where: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('name')),
            req.body.supplier.trim().toLowerCase()
          )
        });
        if (!supplierObj) {
          supplierObj = await Supplier.create({ name: req.body.supplier.trim() });
        }
        updateData.supplierId = supplierObj.id;
      }
      if (Object.keys(updateData).length === 0) {
      const data = whisky.toJSON();
      data.origin = data.origin?.country || '';
      data.supplier = data.supplier?.name || '';
      data.label = data.label?.name || '';
      data.type = data.type?.name || '';
      data.peatLevel = data.peatLevel?.name || '';
        return res.status(400).json({ error: "Aucune donnée à mettre à jour.", ...data });
      }
      await whisky.update(updateData);
      // On recharge l'objet avec les associations pour la réponse
      const updatedWhisky = await Whisky.findOne({
        where: { id: req.params.id, userId: req.user.id },
        include: [
          { model: Origin, as: 'origin', attributes: ['country'] },
          { model: Supplier, as: 'supplier', attributes: ['name'] },
          { model: Label, as: 'label', attributes: ['name'] },
          { model: Type, as: 'type', attributes: ['name'] },
          { model: PeatLevel, as: 'peatLevel', attributes: ['name'] }
        ]
      });
      const data = updatedWhisky.toJSON();
      data.origin = data.origin?.country || '';
      data.supplier = data.supplier?.name || '';
      data.label = data.label?.name || '';
      data.type = data.type?.name || '';
      data.peatLevel = data.peatLevel?.name || '';
      return res.status(200).json(data);
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
