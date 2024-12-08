import mongoose from "mongoose";

const adjustmentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  priority: { type: String, required: true },
  date: { type: Date, required: true },
  reportedBy: { type: String, required: true },
  location: { type: String, required: true },
  resolved: { type: Boolean, required: true },
});

const Adjustment = mongoose.model("Adjustment", adjustmentSchema);

export default Adjustment;
