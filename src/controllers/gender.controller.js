import Gender from "../models/gender.model.js";

const genderController = {

    getAllGender: async (req, res) => {
        try {
            const gender = await Gender.findAll();

            if (!gender) {
                return res.status(400).json({ message: "Aucun genre disponible" });
            }

            res.status(200).json(gender);

        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    getGenderById: async (req, res) => {

    },

    createGender: async (req, res) => {
        try {
            const { name } = req.body;

            const newGender = await Gender.create({ name });

            if (!name) {
				res.status(400).json({ error: "Missing body parameter: 'name'." });
            } else {
            res.status(201).json(newGender)
            }
            
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

export default genderController;