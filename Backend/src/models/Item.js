const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemDescription: { type: String, required: true },
  itemCategory: { type: String, required: true },
  itemSKU: { type: String, required: true },
  quantity: { type: Number, required: true },
  reorderPoint: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  stockLocation: { type: String, required: true },
  supplier: { type: String, required: true },
});

module.exports = mongoose.model("Item", itemSchema);
