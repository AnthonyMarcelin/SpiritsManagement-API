import Whisky from "../models/whisky.model.js";

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

    getWhiskyById: async (req, res) => {

    },

    createWhisky: async (req, res) => {
        try {
            const {name, description, review, gender, nature, price, photo, origin} = req.body;

            const newWhisky = await Whisky.create({name, description, review, gender, nature, price, photo, origin});

            res.status(201).json(newWhisky)
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

export default whiskyController;