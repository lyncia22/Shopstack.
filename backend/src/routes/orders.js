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
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { items = [], shipping = {} } = req.body;
    let total = 0;
    const orderItems = [];

    for (const it of items) {
      const prod = await Product.findById(it.productId).session(session);
      if (!prod) throw new Error('Product missing');
      if (prod.stock < it.quantity) throw new Error(`Out of stock: ${prod.name || prod._id}`);
      prod.stock -= it.quantity;
      await prod.save({ session });
      orderItems.push({ product: prod._id, quantity: it.quantity, priceCents: prod.priceCents });
      total += prod.priceCents * it.quantity;
    }

    const docs = await Order.create([{ userId: req.user?.uid || 'anon', items: orderItems, totalCents: total, shipping }], { session });
    const order = docs[0];
    await session.commitTransaction();
    session.endSession();

    // Payment: use Stripe if configured, otherwise return a mocked clientSecret
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

    // Send confirmation email (best-effort)
    const recipientEmail = req.user?.email || 'customer@example.com';
    console.log('Sending order confirmation email to:', recipientEmail);
    sendOrderEmail(recipientEmail, order)
      .then(() => console.log('Order confirmation email sent successfully'))
      .catch((error) => console.error('Error sending order confirmation email:', error));


    res.json({ order, clientSecret });
  } catch (err) {
    await session.abortTransaction().catch(()=>{});
    session.endSession();
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.post('/:id/fulfill', verifyFirebaseToken, async (req, res) => {
  const o = await Order.findByIdAndUpdate(req.params.id, { status: 'fulfilled' }, { new: true });
  res.json(o);
});

module.exports = router;