const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const verifyFirebaseToken = require('../middleware/auth');
const { sendOrderEmail } = require('../utils/email');

let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
}

const router = express.Router();

// create order: expect items [{productId, quantity}] and shipping (optional)
router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    // Log the incoming request body from the frontend
    console.log('Received new order request from frontend with body:', JSON.stringify(req.body, null, 2));

    const { items = [], shipping = {} } = req.body;
    let total = 0;
    const orderItems = [];

    // First, validate all products and calculate the total
    for (const it of items) {
      const prod = await Product.findById(it.productId);
      if (!prod) throw new Error('Product missing');
      if (prod.stock < it.quantity) throw new Error(`Out of stock: ${prod.name || prod._id}`);
      orderItems.push({ product: prod._id, quantity: it.quantity, priceCents: prod.priceCents });
      total += prod.priceCents * it.quantity;
    }

    // Create and save the order to the database
    const order = new Order({ userId: req.user?.uid || 'anon', items: orderItems, totalCents: total, shipping });
    await order.save();
    console.log(`SUCCESS: Order ${order._id} saved to database.`);

    // After the order is saved, update the stock for each product
    for (const it of items) {
      await Product.updateOne({ _id: it.productId }, { $inc: { stock: -it.quantity } });
    }
    console.log('Product stock updated.');

    let clientSecret = null;
    if (stripe) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
        metadata: { orderId: order._id.toString() }
      });
      clientSecret = paymentIntent.client_secret;
    } else {
      // Mocked payment flow for testing/dev
      clientSecret = `mock_client_secret_${order._id.toString()}`;
      console.log('Mock payment used for order', order._id.toString());
    }

    // Send confirmation email and wait for it to complete
    try {
      const recipientEmail = req.user?.email || 'customer@example.com';
      await sendOrderEmail(recipientEmail, order);
      console.log("Order confirmation email sent successfully to:", recipientEmail);
    } catch (emailError) {
      console.error("Order confirmation email failed to send:", emailError);

    }

    res.json({ order, clientSecret });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.post('/:id/fulfill', verifyFirebaseToken, async (req, res) => {
  const o = await Order.findByIdAndUpdate(req.params.id, { status: 'fulfilled' }, { new: true });
  res.json(o);
});

module.exports = router;