import Label from "../models/label.model.js";

const labelController = {

    getAllLabel: async (req, res) => {
        try {
            const label = await Label.findAll();

            if (!label) {
                return res.status(400).json({ message: "Aucun label disponible" });
            }

            res.status(200).json(label);

        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    getLabelById: async (req, res) => {

    },

    createLabel: async (req, res) => {
        try {
            const { name, color } = req.body;

            const newLabel = await Label.create({ name, color });

            if (!name && !color) {
                res.status(400).json({ error: "Missing body parameter: 'name' or 'color'." });
            } else {
            res.status(201).json(newLabel)
            }
            
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

export default labelController;