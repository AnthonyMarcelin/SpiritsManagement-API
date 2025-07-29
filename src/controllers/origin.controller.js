import Origin from "../models/origin.model.js";
import sequelize from "../database/client.js";

const originController = {
  getAllOrigin: async (req, res) => {
    try {
      const countries = await Origin.findAll();
      if (!countries || countries.length === 0) {
        return res.status(404).json({ message: "Aucune origine disponible" });
      }
      return res.status(200).json(countries);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getOriginById: async (req, res) => {
    try {
      const country = await Origin.findByPk(req.params.id);
      if (!country) {
        return res.status(404).json({ message: "Aucun pays trouvé" });
      }
      return res.status(200).json(country);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  createOrigin: async (req, res) => {
    try {
      const { country } = req.body;
      if (!country) {
        return res.status(400).json({ error: "Le champ 'country' est requis." });
      }
      const countryNorm = country.trim();
      const origin = await Origin.findOne({
        where: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('country')),
          countryNorm.toLowerCase()
        )
      });
      if (origin) {
        return res.status(200).json(origin);
      }
      const newCountry = await Origin.create({ country: countryNorm });
      return res.status(201).json(newCountry);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateOrigin: async (req, res) => {
    try {
      const country = await Origin.findByPk(req.params.id);
      if (!country) {
        return res.status(404).json({ error: "Origine non trouvée" });
      }
      const { country: countryName } = req.body;
      const updateData = {};
      if (typeof countryName !== 'undefined') updateData.country = countryName;
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "Aucune donnée à mettre à jour." });
      }
      await country.update(updateData);
      return res.status(200).json(country);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteOrigin: async (req, res) => {
    try {
      const country = await Origin.findByPk(req.params.id);
      if (!country) return res.status(404).json({ error: "Not found" });
      await country.destroy();
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

export default originController;
