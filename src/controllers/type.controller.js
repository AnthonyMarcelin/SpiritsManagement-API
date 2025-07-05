import Type from "../models/type.model.js";

const typeController = {
  getAllType: async (req, res) => {
    try {
      // Filtrage automatique selon le type d'alcool passé en query ?alcohol=whisky|rhum|beer
      const { alcohol } = req.query;
      let where = {};
      if (alcohol === "whisky") where.for_whisky = true;
      else if (alcohol === "rhum") where.for_rhum = true;
      else if (alcohol === "beer") where.for_beer = true;
      const types = await Type.findAll({ where });
      res.status(200).json(types);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getTypeById: async (req, res) => {
    try {
      const type = await Type.findByPk(req.params.id);
      if (!type) return res.status(404).json({ error: "Not found" });
      res.status(200).json(type);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  createType: async (req, res) => {
    try {
      const type = await Type.create(req.body);
      res.status(201).json(type);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  updateType: async (req, res) => {
    try {
      const type = await Type.findByPk(req.params.id);
      if (!type) return res.status(404).json({ error: "Not found" });
      await type.update(req.body);
      res.status(200).json(type);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  deleteType: async (req, res) => {
    try {
      const type = await Type.findByPk(req.params.id);
      if (!type) return res.status(404).json({ error: "Not found" });
      await type.destroy();
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default typeController;
