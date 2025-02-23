import Supplier from "../models/supplier.model.js";

const supplierController = {

    getAllSupplier: async (req, res) => {
        try {
            const supplier = await Supplier.findAll();

            if (!supplier) {
                return res.status(400).json({ message: "Aucun fournisseur disponible" });
            }

            res.status(200).json(supplier);

        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    getSupplierById: async (req, res) => {

    },

    createSupplier: async (req, res) => {
        try {
            const { name, adress } = req.body;

            const newSupplier = await Supplier.create({ name, adress });

            if (!name) {
                res.status(400).json({ error: "Missing body parameter: 'name'." });
            } else {
            res.status(201).json(newSupplier)
            }
            
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

}

export default supplierController;