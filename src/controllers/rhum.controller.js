import Rhum from "../models/rhum.model.js";
import Type from "../models/type.model.js";

const rhumController = {
  getAllRhum: async (req, res) => {
    try {
      const rhum = await Rhum.findAll();

      if (!rhum) {
        return res.status(400).json({ message: "Aucun rhum disponible" });
      }

      res.status(200).json(rhum);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getRhumById: async (req, res) => {},

  createRhum: async (req, res) => {
    try {
      const { name, description, review, gender, price, photo, origin } =
        req.body;

      const newRhum = await Rhum.create({
        name,
        description,
        review,
        gender,
        price,
        photo,
        origin,
      });

      res.status(201).json(newRhum);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Ajout d'une méthode pour obtenir les types de rhum facilement côté front
  getRhumTypes: async (req, res) => {
    try {
      const types = await Type.findAll({ where: { for_rhum: true } });
      res.json(types);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export const getRhumTypes = rhumController.getRhumTypes;
export default rhumController;
