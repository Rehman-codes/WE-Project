import express from "express";
import {
  createContract,
  getContracts,
  deleteContract,
  updateContract,
} from "../controllers/contractController.js";

const router = express.Router();

router.post("/create", createContract);
router.get("/all", getContracts);
router.delete("/:id", deleteContract);
router.put("/:id", updateContract);

export default router;
