import Nature from "../models/nature.model.js";

const natureController = {

    getAllNature: async (req, res) => {
        try {
            const nature = await Nature.findAll();

            if (!nature) {
                return res.status(400).json({ message: "Aucun type disponible" });
            }

            res.status(200).json(nature);

        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    getNatureById: async (req, res) => {

    },

    createNature: async (req, res) => {
        try {
            const { name } = req.body;

            const newNature = await Nature.create({ name });

            if (!name) {
                res.status(400).json({ error: "Missing body parameter: 'name'." });
            } else {
            res.status(201).json(newNature)
            }
            
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

export default natureController;