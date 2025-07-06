import express from 'express';
import supplierController from '../controllers/supplier.controller.js';

const supplierRouter = express.Router();

supplierRouter.get("/", supplierController.getAllSupplier);
supplierRouter.get("/:id", supplierController.getSupplierById);
supplierRouter.post("/", supplierController.createSupplier);
supplierRouter.put("/:id", supplierController.updateSupplier);
supplierRouter.delete("/:id", supplierController.deleteSupplier);

export default supplierRouter;
