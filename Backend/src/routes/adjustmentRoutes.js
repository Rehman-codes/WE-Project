import express from "express";
import { getAdjustments, deleteAdjustment, updateAdjustment } from "../controllers/adjustmentController.js";

const router = express.Router();

router.get("/all", getAdjustments);
router.delete("/:id", deleteAdjustment);
router.put("/:id", updateAdjustment);

export default router;
