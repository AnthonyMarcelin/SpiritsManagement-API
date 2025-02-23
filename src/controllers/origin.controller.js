import Origin from "../models/origin.model.js";

const originController = {

    getAllOrigin: async (req, res) => {
        try {
            const country = await Origin.findAll();

            if (!country) {
                return res.status(400).json({ message: "Aucune origine disponible" });
            }

            res.status(200).json(country);

        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    getOriginById: async (req, res) => {

    },

    createOrigin: async (req, res) => {
        try {
            const { country } = req.body;

            const newCountry = await Origin.create({ country });

            if (!country) {
                res.status(400).json({ error: "Missing body parameter: 'country'." });
            } else {
            res.status(201).json(newCountry)
            }
            
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

export default originController;