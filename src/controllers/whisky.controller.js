import Whisky from "../models/whisky.model.js";
import Type from "../models/type.model.js";

const whiskyController = {
  getAllWhisky: async (req, res) => {
    try {
      const whisky = await Whisky.findAll();

      if (!whisky) {
        return res.status(400).json({ message: "Aucun whisky disponible" });
      }

      res.status(200).json(whisky);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getWhiskyById: async (req, res) => {},

  createWhisky: async (req, res) => {
    try {
      console.log("BODY:", req.body);
      const {
        name,
        description,
        review,
        price,
        label_id,
        origin_id,
        supplier_id,
        peat_level_id,
        type_id,
      } = req.body;
      let photoPath = null;
      if (req.file) {
        photoPath = req.file.path;
      }
      const newWhisky = await Whisky.create({
        name,
        description,
        review,
        price,
        label_id,
        origin_id,
        supplier_id,
        peat_level_id,
        type_id,
        photo: photoPath,
      });

      res.status(201).json(newWhisky);
    } catch (error) {
      console.error(error); // Affiche l'erreur complète dans la console
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Ajout d'une méthode pour obtenir les types de whisky facilement côté front
  getWhiskyTypes: async (req, res) => {
    try {
      const types = await Type.findAll({ where: { for_whisky: true } });
      res.status(200).json(types);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export const getWhiskyTypes = whiskyController.getWhiskyTypes;
export default whiskyController;
