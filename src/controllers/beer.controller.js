import sequelize from "../database/client.js";
import Beer from "../models/beer.model.js";
import Type from "../models/type.model.js";

const beerController = {
  getAllBeer: async (req, res) => {
    try {
      const beers = await Beer.findAll({ where: { userId: req.user.id } });
      if (!beers || beers.length === 0) {
        return res.status(404).json({ message: "Aucune bière disponible" });
      }
      return res.status(200).json(beers);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getBeerById: async (req, res) => {
    try {
      const beer = await Beer.findOne({ where: { id: req.params.id, userId: req.user.id } });
      if (!beer) {
        return res.status(404).json({ error: "Bière non trouvée" });
      }
      return res.status(200).json(beer);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  createBeer: async (req, res) => {
    console.log('[BEER][POST] req.body:', req.body);
    console.log('[BEER][POST] req.file:', req.file);
    console.log('[BEER] req.body reçu:', req.body);

    try {
      const { name, description, review, price, labelId, origin, supplier, typeId, note } = req.body;
      if (!name || !description || !price || !labelId || !origin || !supplier || !typeId) {
        return res.status(400).json({ error: "Champs obligatoires manquants pour la création d'une bière." });
      }

      const beerNameNorm = name.trim();
      const existingBeer = await Beer.findOne({
        where: {
          name: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('name')),
            beerNameNorm.toLowerCase()
          ),
          userId: req.user.id
        }
      });
      if (existingBeer) {
        return res.status(409).json({ error: "Une bière avec ce nom existe déjà dans votre collection.", beer: existingBeer });
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
        console.log(`[BEER] Nouvelle origin créée: ${origin.trim()}`);
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
        console.log(`[BEER] Nouveau supplier créé: ${supplier.trim()}`);
      }
      const finalSupplierId = supplierObj.id;

      const photoPath = req.body.photo || (req.file ? req.file.path : null);
      const newBeer = await Beer.create({
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
      return res.status(201).json(newBeer);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateBeer: async (req, res) => {
    try {
      const beer = await Beer.findOne({ where: { id: req.params.id, userId: req.user.id } });
      if (!beer) {
        return res.status(404).json({ error: "Bière non trouvée" });
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
        const Origin = (await import("../models/origin.model.js")).default;
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
        const Supplier = (await import("../models/supplier.model.js")).default;
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
        return res.status(400).json({ error: "Aucune donnée à mettre à jour." });
      }
      await beer.update(updateData);
      return res.status(200).json(beer);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteBeer: async (req, res) => {
    try {
      const beer = await Beer.findOne({ where: { id: req.params.id, userId: req.user.id } });
      if (!beer) {
        return res.status(404).json({ error: "Bière non trouvée" });
      }
      await beer.destroy();
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getBeerTypes: async (req, res) => {
    try {
      const types = await Type.findAll({ where: { for_beer: true } });
      return res.status(200).json(types);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

export default beerController;
