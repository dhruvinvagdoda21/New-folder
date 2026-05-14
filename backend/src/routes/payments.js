const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/create-checkout-session', protect, async (req, res) => {
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const { bookingId, amount, service } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: `PetConnect - ${service}` },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/bookings?status=success&booking=${bookingId}`,
      cancel_url: `${process.env.CLIENT_URL}/bookings?status=cancelled`,
      metadata: { bookingId, userId: req.user._id.toString() },
    });
    res.json({ success: true, sessionId: session.id, url: session.url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers['stripe-signature'];
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const Payment = require('../models/Payment');
      const Booking = require('../models/Booking');
      await Payment.create({
        booking: session.metadata.bookingId,
        payer: session.metadata.userId,
        amount: session.amount_total / 100,
        stripeSessionId: session.id,
        stripePaymentId: session.payment_intent,
        status: 'succeeded',
      });
      await Booking.findByIdAndUpdate(session.metadata.bookingId, { paymentStatus: 'paid' });
    }
    res.json({ received: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
