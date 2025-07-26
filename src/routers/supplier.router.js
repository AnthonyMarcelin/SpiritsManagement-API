import express from 'express';
import supplierController from '../controllers/supplier.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const supplierRouter = express.Router();

supplierRouter.get("/", verifyToken, supplierController.getAllSupplier);
supplierRouter.get("/:id", supplierController.getSupplierById);

supplierRouter.use(verifyToken);
supplierRouter.post("/", supplierController.createSupplier);
supplierRouter.put("/:id", supplierController.updateSupplier);
supplierRouter.delete("/:id", supplierController.deleteSupplier);

export default supplierRouter;
