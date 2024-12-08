import mongoose from "mongoose";

const contractSchema = new mongoose.Schema({
  contractTitle: { type: String, required: true },
  supplierName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  termsAndConditions: { type: String, required: true },
});

const Contract = mongoose.model("Contract", contractSchema);

export default Contract;
