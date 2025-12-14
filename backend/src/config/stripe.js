// src/config/stripe.js
import 'dotenv/config'; // loads .env automatically
import Stripe from 'stripe';

// Ensure the environment variable is loaded
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in your environment');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-31', // use the API version you prefer
});

console.log('Stripe key loaded:', !!process.env.STRIPE_SECRET_KEY);

export default stripe;
