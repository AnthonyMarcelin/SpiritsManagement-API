import sequelize from "../database/client.js";
import Rhum from "../models/rhum.model.js";
import Type from "../models/type.model.js";
import Origin from "../models/origin.model.js";
import Supplier from "../models/supplier.model.js";
import Label from "../models/label.model.js";

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
      // Associations importées statiquement avec alias
      const rhum = await Rhum.findOne({
        where: { id, userId: req.user.id },
        include: [
          { model: Origin, as: 'origin', attributes: ['country'] },
          { model: Supplier, as: 'supplier', attributes: ['name'] },
          { model: Label, as: 'label', attributes: ['name'] },
          { model: Type, as: 'type', attributes: ['name'] }
        ]
      });
      if (!rhum) {
        return res.status(404).json({ message: "Rhum non trouvé" });
      }
      const data = rhum.toJSON();
      data.origin = data.origin?.country || '';
      data.supplier = data.supplier?.name || '';
      data.label = data.label?.name || '';
      data.type = data.type?.name || '';
      return res.status(200).json(data);
    } catch (error) {
      console.error('[RHUM][GET BY ID] Erreur :', error);
      return res.status(500).json({ error: error.message, stack: error.stack });
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
      // Associations importées statiquement
      const rhum = await Rhum.findOne({
        where: { id, userId: req.user.id },
        include: [
          { model: Origin, as: 'origin', attributes: ['country'] },
          { model: Supplier, as: 'supplier', attributes: ['name'] },
          { model: Label, as: 'label', attributes: ['name'] },
          { model: Type, as: 'type', attributes: ['name'] }
        ]
      });
      if (!rhum) {
        return res.status(404).json({ message: "Rhum non trouvé" });
      }
      const updateData = {};
      ["name", "description", "review", "price", "labelId", "typeId", "note"].forEach(field => {
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
      const data = rhum.toJSON();
      data.origin = data.origin?.country || '';
      data.supplier = data.supplier?.name || '';
      data.label = data.label?.name || '';
      data.type = data.type?.name || '';
        return res.status(400).json({ error: "Aucune donnée à mettre à jour.", ...data });
      }
      await rhum.update(updateData);
      // On recharge l'objet avec les associations pour la réponse
      const updatedRhum = await Rhum.findOne({
        where: { id, userId: req.user.id },
        include: [
          { model: Origin, as: 'origin', attributes: ['country'] },
          { model: Supplier, as: 'supplier', attributes: ['name'] },
          { model: Label, as: 'label', attributes: ['name'] },
          { model: Type, as: 'type', attributes: ['name'] }
        ]
      });
      const data = updatedRhum.toJSON();
      data.origin = data.origin?.country || '';
      data.supplier = data.supplier?.name || '';
      data.label = data.label?.name || '';
      data.type = data.type?.name || '';
      return res.status(200).json(data);
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
