import Label from "../models/label.model.js";
import sequelize from "../database/client.js";

const labelController = {
  getAllLabel: async (req, res) => {
    try {
      const labels = await Label.findAll();
      if (!labels || labels.length === 0) {
        return res.status(404).json({ message: "Aucun label disponible" });
      }
      return res.status(200).json(labels);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getLabelById: async (req, res) => {
    try {
      const label = await Label.findByPk(req.params.id);
      if (!label) {
        return res.status(404).json({ error: "Label non trouvé" });
      }
      return res.status(200).json(label);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  createLabel: async (req, res) => {
    try {
      console.log('[LABEL] createLabel - req.user:', req.user);
      const { name, color } = req.body;
      if (!name || !color) {
        return res.status(400).json({
          error: "Missing body parameter: 'name' or 'color'.",
        });
      }
      const nameNorm = name.trim();
      const label = await Label.findOne({
        where: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('name')),
          nameNorm.toLowerCase()
        )
      });
      if (label) {
        console.log('[LABEL] createLabel - label déjà existant:', label.id);
        return res.status(200).json(label);
      }
      const newLabel = await Label.create({ name: nameNorm, color });
      console.log('[LABEL] createLabel - label créé:', newLabel.id);
      return res.status(201).json(newLabel);
    } catch (error) {
      console.log('[LABEL] createLabel - erreur:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  updateLabel: async (req, res) => {
    try {
      console.log('[LABEL] updateLabel - req.user:', req.user);
      const label = await Label.findByPk(req.params.id);
      if (!label) {
        console.log('[LABEL] updateLabel - label non trouvé:', req.params.id);
        return res.status(404).json({ error: "Label non trouvé" });
      }
      const { name, color } = req.body;
      const updateData = {};
      if (typeof name !== 'undefined') updateData.name = name;
      if (typeof color !== 'undefined') updateData.color = color;
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "Aucune donnée à mettre à jour." });
      }
      await label.update(updateData);
      console.log('[LABEL] updateLabel - label mis à jour:', label.id);
      return res.status(200).json(label);
    } catch (error) {
      console.log('[LABEL] updateLabel - erreur:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  deleteLabel: async (req, res) => {
    try {
      console.log('[LABEL] deleteLabel - req.user:', req.user);
      const label = await Label.findByPk(req.params.id);
      if (!label) {
        console.log('[LABEL] deleteLabel - label non trouvé:', req.params.id);
        return res.status(404).json({ error: "Label non trouvé" });
      }
      await label.destroy();
      console.log('[LABEL] deleteLabel - label supprimé:', label.id);
      return res.status(204).end();
    } catch (error) {
      console.log('[LABEL] deleteLabel - erreur:', error);
      return res.status(500).json({ error: error.message });
    }
  },
};

export default labelController;
