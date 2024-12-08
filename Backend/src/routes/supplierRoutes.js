import express from "express";
import {
  createSupplier,
  getSuppliers,
  deleteSupplier,
  updateSupplier,
} from "../controllers/supplierController.js";

const router = express.Router();

router.post("/create", createSupplier);
router.get("/all", getSuppliers);
router.delete("/:id", deleteSupplier);
router.put("/:id", updateSupplier);

export default router;
