import Beer from "../models/beer.model.js";

const beerController = {

    getAllBeer: async (req, res) => {
        try {
            const beer = await Beer.findAll();

            if (!beer) {
                return res.status(400).json({ message: "Aucune bière disponible" });
            }

        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    getBeerById: async (req, res) => {

    },

    createBeer: async (req, res) => {
        try {
            const {name, description, review, gender, price, photo, origin} = req.body;

            const newBeer = await beer.create({name, description, review, gender, price, photo, origin});

            res.status(201).json(newBeer)
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

export default beerController;