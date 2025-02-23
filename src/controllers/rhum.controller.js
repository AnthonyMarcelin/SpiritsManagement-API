import Rhum from "../models/rhum.model.js";

const rhumController = {

    getAllRhum: async (req, res) => {
        try {
            const rhum = await Rhum.findAll();

            if (!rhum) {
                return res.status(400).json({ message: "Aucun rhum disponible" });
            }

        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    getRhumById: async (req, res) => {

    },

    createRhum: async (req, res) => {
        try {
            const {name, description, review, gender, price, photo, origin} = req.body;

            const newRhum = await Rhum.create({name, description, review, gender, price, photo, origin});

            res.status(201).json(newRhum)
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

export default rhumController;