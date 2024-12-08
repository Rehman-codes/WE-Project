import express from "express";
import {
  createInspectionReport,
  getInspectionReports,
  deleteInspectionReport,
  updateInspectionReport,
} from "../controllers/inspectionReportController.js";

const router = express.Router();

router.post("/create", createInspectionReport);
router.get("/all", getInspectionReports);
router.delete("/:id", deleteInspectionReport);
router.put("/:id", updateInspectionReport);

export default router;
