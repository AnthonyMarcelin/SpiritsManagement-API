import Beer from "../models/beer.model.js";
import Type from "../models/type.model.js";

const beerController = {
  getAllBeer: async (req, res) => {
    try {
      const beer = await Beer.findAll();

      if (!beer) {
        return res.status(400).json({ message: "Aucune bière disponible" });
      }

      res.status(200).json(beer);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getBeerById: async (req, res) => {},

  createBeer: async (req, res) => {
    try {
      const { name, description, review, gender, price, photo, origin } =
        req.body;

      const newBeer = await beer.create({
        name,
        description,
        review,
        gender,
        price,
        photo,
        origin,
      });

      res.status(201).json(newBeer);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Ajout d'une méthode pour obtenir les types de bière facilement côté front
  getBeerTypes: async (req, res) => {
    try {
      const types = await Type.findAll({ where: { for_beer: true } });
      res.json(types);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export const getBeerTypes = beerController.getBeerTypes;
export default beerController;
