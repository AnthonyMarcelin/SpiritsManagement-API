import PeatLevel from "../models/peatLevel.model.js";

const peatLevelController = {
  getAllPeatLevel: async (req, res) => {
    try {
      const peatLevels = await PeatLevel.findAll();
      res.status(200).json(peatLevels);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getPeatLevelById: async (req, res) => {
    try {
      const peatLevel = await PeatLevel.findByPk(req.params.id);
      if (!peatLevel) return res.status(404).json({ error: "Not found" });
      res.status(200).json(peatLevel);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  createPeatLevel: async (req, res) => {
    try {
      const peatLevel = await PeatLevel.create(req.body);
      res.status(201).json(peatLevel);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  updatePeatLevel: async (req, res) => {
    try {
      const peatLevel = await PeatLevel.findByPk(req.params.id);
      if (!peatLevel) return res.status(404).json({ error: "Not found" });
      await peatLevel.update(req.body);
      res.status(200).json(peatLevel);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  removePeatLevel: async (req, res) => {
    try {
      const peatLevel = await PeatLevel.findByPk(req.params.id);
      if (!peatLevel) return res.status(404).json({ error: "Not found" });
      await peatLevel.destroy();
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default peatLevelController;
