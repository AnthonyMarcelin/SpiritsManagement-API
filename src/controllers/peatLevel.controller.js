
import PeatLevel from "../models/peatLevel.model.js";


const peatLevelController = {
  getAllPeatLevel: async (req, res) => {
    try {
      const peatLevels = await PeatLevel.findAll();

      if (!peatLevels || peatLevels.length === 0) {
        return res.status(404).json({ message: "Aucun niveau de tourbe disponible" });
      }

      return res.status(200).json(peatLevels);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  getPeatLevelById: async (req, res) => {
    try {
      const peatLevel = await PeatLevel.findByPk(req.params.id);

      if (!peatLevel) {
        return res.status(404).json({ error: "Not found" });
      }

      return res.status(200).json(peatLevel);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  createPeatLevel: async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Le champ 'name' est requis" });
      }

      const peatLevel = await PeatLevel.create({ name });

      return res.status(201).json(peatLevel);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  updatePeatLevel: async (req, res) => {
    try {
      const peatLevel = await PeatLevel.findByPk(req.params.id);

      if (!peatLevel) {
        return res.status(404).json({ error: "Not found" });
      }

      const { name } = req.body;
      const updateData = {};

      if (typeof name !== "undefined") {
        updateData.name = name;
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "Aucune donnée à mettre à jour." });
      }

      await peatLevel.update(updateData);

      return res.status(200).json(peatLevel);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  deletePeatLevel: async (req, res) => {
    try {
      const peatLevel = await PeatLevel.findByPk(req.params.id);

      if (!peatLevel) {
        return res.status(404).json({ error: "Not found" });
      }

      await peatLevel.destroy();

      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};


export default peatLevelController;
