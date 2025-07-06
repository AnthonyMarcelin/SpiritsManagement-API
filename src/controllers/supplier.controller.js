import Supplier from "../models/supplier.model.js";

const supplierController = {

    getAllSupplier: async (req, res) => {
        try {
            const supplier = await Supplier.findAll();

            if (!supplier) {
                return res.status(400).json({ message: "Aucun fournisseur disponible" });
            }

            return res.status(200).json(supplier);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    getSupplierById: async (req, res) => {
        try {
            const supplier = await Supplier.findByPk(req.params.id);
            if (!supplier) {
                return res.status(404).json({ error: "Fournisseur non trouvé" });
            }
            return res.status(200).json(supplier);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    createSupplier: async (req, res) => {
        try {
            const { name, adress } = req.body;
            if (!name || !adress) {
                return res.status(400).json({ error: "Champs obligatoires manquants pour la création d'un fournisseur." });
            }
            const newSupplier = await Supplier.create({ name, adress });
            return res.status(201).json(newSupplier);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    updateSupplier: async (req, res) => {
        try {
            const supplier = await Supplier.findByPk(req.params.id);
            if (!supplier) {
                return res.status(404).json({ error: "Fournisseur non trouvé" });
            }
            const { name, adress } = req.body;
            const updateData = {};
            if (typeof name !== 'undefined') updateData.name = name;
            if (typeof adress !== 'undefined') updateData.adress = adress;
            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({ error: "Aucune donnée à mettre à jour." });
            }
            await supplier.update(updateData);
            return res.status(200).json(supplier);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    deleteSupplier: async (req, res) => {
        try {
            const supplier = await Supplier.findByPk(req.params.id);
            if (!supplier) {
                return res.status(404).json({error: "Revendeur non trouve"})
            }
            await supplier.destroy()
            return res.status(204).end()
        } catch (error) {
            return res.status(500).json({ error: error.message });

        }
    }

}

export default supplierController;
