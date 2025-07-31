import sequelize from "../database/client.js";
import Type from "../models/type.model.js";

const typeController = {
  getAllType: async (req, res) => {
    try {


      const { alcohol } = req.query;

      const where = {};
      if (alcohol === "whisky") where.forWhisky = true;
      else if (alcohol === "rhum") where.forRhum = true;
      else if (alcohol === "beer") where.forBeer = true;

      const types = await Type.findAll({ where });


      return res.status(200).json(types);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  getTypeById: async (req, res) => {
    try {

      const type = await Type.findByPk(req.params.id);
      if (!type) return res.status(404).json({ error: "Not found" });

      return res.status(200).json(type);

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  createType: async (req, res) => {
    try {
      const { name, forWhisky, forRhum, forBeer } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Le champ 'name' est requis." });
      }

      const nameNorm = name.trim();

      const typeObj = await Type.findOne({
        where: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('name')),
          nameNorm.toLowerCase()
        )
      });

      if (typeObj) {
        return res.status(200).json(typeObj);
      }

      const type = await Type.create({ name: nameNorm, forWhisky, forRhum, forBeer });

      return res.status(201).json(type);

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  updateType: async (req, res) => {
    try {

      const type = await Type.findByPk(req.params.id);
      if (!type) return res.status(404).json({ error: "Not found" });

      const { name, forWhisky, forRhum, forBeer } = req.body;

      const updateData = {};
      if (typeof name !== 'undefined') updateData.name = name;
      if (typeof forWhisky !== 'undefined') updateData.forWhisky = forWhisky;
      if (typeof forRhum !== 'undefined') updateData.forRhum = forRhum;
      if (typeof forBeer !== 'undefined') updateData.forBeer = forBeer;

      if (Object.keys(updateData).length === 0) {

        return res.status(400).json({ error: "Aucune donnée à mettre à jour." });
      }

      await type.update(updateData);

      return res.status(200).json(type);

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  deleteType: async (req, res) => {
    try {

      const type = await Type.findByPk(req.params.id);
      if (!type) return res.status(404).json({ error: "Not found" });

      await type.destroy();

      return res.status(204).end();

    } catch (err) {

      return res.status(500).json({ error: err.message });

    }
  },
};

export default typeController;
