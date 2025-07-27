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

    try {
      const { name, description, review, gender, price, origin, note } = req.body;
      if (!name || !description || !gender || !price || !origin) {
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

      let finalOriginId = origin;
      const Origin = (await import("../models/origin.model.js")).default;
      if (!finalOriginId || Number.isNaN(Number(finalOriginId))) {
        const originCountryRaw = req.body.originName || origin;
        const originCountry = originCountryRaw.trim();
        let originObj = await Origin.findOne({
          where: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('country')),
            originCountry.toLowerCase()
          )
        });
        if (!originObj) {
          originObj = await Origin.create({ country: originCountry });
        }
        finalOriginId = originObj.id;
      }

      let finalSupplierId = req.body.supplierId;
      const Supplier = (await import("../models/supplier.model.js")).default;
      if (!finalSupplierId || Number.isNaN(Number(finalSupplierId))) {
        const supplierNomRaw = req.body.supplierName || req.body.supplierId;
        const supplierNom = supplierNomRaw ? supplierNomRaw.trim() : "";
        let supplierObj = await Supplier.findOne({
          where: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('name')),
            supplierNom.toLowerCase()
          )
        });
        if (!supplierObj) {
          supplierObj = await Supplier.create({ name: supplierNom });
        }
        finalSupplierId = supplierObj.id;
      }

      const photoPath = req.body.photo || (req.file ? req.file.path : null);
      const newBeer = await Beer.create({
        name,
        description,
        review,
        gender,
        price,
        origin: finalOriginId,
        supplierId: finalSupplierId,
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
