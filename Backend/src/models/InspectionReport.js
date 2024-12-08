import mongoose from "mongoose";

const inspectionReportSchema = new mongoose.Schema({
  inspectionItem: { type: String, required: true },
  supplier: { type: String, required: true },
  inspectionDate: { type: Date, required: true },
  qualityCheck: { type: String, required: true },
  quantityCheck: { type: String, required: true },
  inspector: { type: String, required: true },
  notes: { type: String, required: true },
});

const InspectionReport = mongoose.model(
  "InspectionReport",
  inspectionReportSchema
);

export default InspectionReport;
