const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    supplier: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    orderDate: { type: Date, required: true },
    paymentDate: { type: Date, required: true },
    orderItem: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);