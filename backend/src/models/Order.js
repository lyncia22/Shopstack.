const mongoose = require('mongoose');

const OrderItem = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  priceCents: Number
});

const OrderSchema = new mongoose.Schema({
  userId: String,
  items: [OrderItem],
  totalCents: Number,
  status: { type: String, enum: ['created','paid','fulfilled','cancelled'], default: 'created' },
  createdAt: { type: Date, default: Date.now },
  shipping: Object
});

module.exports = mongoose.model('Order', OrderSchema);
