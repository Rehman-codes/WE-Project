import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  supplier: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  orderDate: { type: Date, required: true },
  paymentDate: { type: Date, required: true },
  orderItem: { type: String, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, required: true },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
