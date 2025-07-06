import Beer from "../models/beer.model.js";
import Type from "../models/type.model.js";

const beerController = {
  getAllBeer: async (req, res) => {
    try {
      const beers = await Beer.findAll();
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
      const beer = await Beer.findByPk(req.params.id);
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
      const { name, description, review, gender, price, origin } = req.body;
      if (!name || !description || !gender || !price || !origin) {
        return res.status(400).json({ error: "Champs obligatoires manquants pour la création d'une bière." });
      }
      let photoPath = null;
      if (req.file) {
        photoPath = req.file.path;
      }
      const newBeer = await Beer.create({
        name,
        description,
        review,
        gender,
        price,
        origin,
        photo: photoPath,
      });
      return res.status(201).json(newBeer);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateBeer: async (req, res) => {
    try {
      const beer = await Beer.findByPk(req.params.id);
      if (!beer) {
        return res.status(404).json({ error: "Bière non trouvée" });
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
      await beer.update(updateData);
      return res.status(200).json(beer);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteBeer: async (req, res) => {
    try {
      const beer = await Beer.findByPk(req.params.id);
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
