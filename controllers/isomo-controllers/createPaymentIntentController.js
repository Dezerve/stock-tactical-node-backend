const { StatusCodes } = require("http-status-codes");
const { devValueLogger } = require("../utils/devLogger");
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

const getStripePublicKey = (req, res) => {
  try {
    const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
    return res.json({ stripePublicKey });
  } catch (error) {
    devValueLogger("error getting stripe public key");
    return res.status(500).json({ error: "key not found" });
  }
};

const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      // Add options here for chargeback protection
      application_fee_amount: amount * 0.1, // Example: Charge 10% fee
      // metadata: {
      //   userId: req.user.id, // if you have user context
      // },
    });
    res.setHeader("Content-Type", "application/json");
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
  getStripePublicKey,
};

// Additional Stripe Options
// In your backend, you can also add options for chargeback protection and other features:
// Chargeback Protection: Stripe provides several features to help manage disputes. You can set up webhooks to handle disputes and use Stripe Radar for fraud detection.

// Example for setting up webhooks

// app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, 'your_webhook_secret');
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntent = event.data.object;
//       console.log('PaymentIntent was successful!');
//       break;
//     case 'payment_intent.payment_failed':
//       console.log('PaymentIntent failed');
//       break;
//     // Handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   res.json({ received: true });
// });
