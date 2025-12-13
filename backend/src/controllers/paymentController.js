import { stripe } from '../server.js'; 


export const createPaymentIntent = async (req, res) => {
  try {
    // Ensure you are receiving the amount in the body
    const { amount } = req.body; 

    // Basic validation
    if (!amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: "Invalid or missing amount." });
    }

    // Use the imported 'stripe' client to create the PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      // Optionally add a receipt email or customer ID here
    });

    // Send back the client_secret to the frontend
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    // Log the error for better server-side debugging
    console.error("Stripe Error in createPaymentIntent:", err.message); 
    res.status(500).json({ error: "Failed to create Payment Intent: " + err.message });
  }
};