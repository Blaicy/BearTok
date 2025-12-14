import Stripe from "stripe";

console.log("Stripe key loaded:", !!process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export default stripe;
