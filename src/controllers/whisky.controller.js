import Whisky from "../models/whisky.model.js";
import Type from "../models/type.model.js";
import sequelize from "../database/client.js";

const whiskyController = {
  getAllWhisky: async (req, res) => {
    try {
      // Si l'utilisateur est authentifié, retourner ses whiskies, sinon tous les whiskies
      const whereClause = req.user ? { userId: req.user.id } : {};
      const whisky = await Whisky.findAll({ where: whereClause });
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
      console.log("[WHISKY] Création demandée par :", req.user);
      console.log("[WHISKY] Body reçu :", req.body);
      const {
        name,
        description,
        review,
        price,
        labelId,
        originId,
        originName,
        supplierId,
        supplierName,
        peatLevelId,
        typeId,
        note
      } = req.body;
      if (!name || !description || !price || !labelId || (!originId && !originName) || (!supplierId && !supplierName) || !peatLevelId || !typeId) {
        console.log("[WHISKY] Champs obligatoires manquants !");
        return res.status(400).json({ error: "Champs obligatoires manquants pour la création d'un whisky." });
      }

      // Gestion labelId (insensible à la casse)
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
      let finalOriginId = originId;
      const Origin = (await import("../models/origin.model.js")).default;
      if (!finalOriginId || Number.isNaN(Number(finalOriginId))) {
        // On normalise la recherche en minuscule
        const originCountryRaw = originName || originId;
        const originCountry = originCountryRaw.trim();
        let origin = await Origin.findOne({
          where: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('country')),
            originCountry.toLowerCase()
          )
        });
        if (!origin) {
          origin = await Origin.create({ country: originCountry });
          console.log(`[WHISKY] Nouvelle origin créée: ${originCountry}`);
        }
        finalOriginId = origin.id;
      }

      // Gestion supplierId (insensible à la casse)
      let finalSupplierId = supplierId;
      const Supplier = (await import("../models/supplier.model.js")).default;
      if (!finalSupplierId || Number.isNaN(Number(finalSupplierId))) {
        // On normalise la recherche en minuscule
        const supplierNomRaw = supplierName || supplierId;
        const supplierNom = supplierNomRaw.trim();
        let supplier = await Supplier.findOne({
          where: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('name')),
            supplierNom.toLowerCase()
          )
        });
        if (!supplier) {
          supplier = await Supplier.create({ name: supplierNom });
          console.log(`[WHISKY] Nouveau supplier créé: ${supplierNom}`);
        }
        finalSupplierId = supplier.id;
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
        labelId: finalLabelId,
        originId: finalOriginId,
        supplierId: finalSupplierId,
        peatLevelId,
        typeId,
        note,
        photo: photoPath,
        userId: req.user.id, // Associer le whisky à l'utilisateur connecté
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
