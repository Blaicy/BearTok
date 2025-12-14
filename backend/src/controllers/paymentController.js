import stripe from "../config/stripe.js";

// Renamed 'err' to 'error' for clearer debugging and logging
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    // Input validation: Ensure amount is valid and in the smallest currency unit (cents).
    if (!amount || typeof amount !== "number" || amount <= 0 || !Number.isInteger(amount)) {
      return res.status(400).json({ 
        error: "Invalid or missing amount. Amount must be a positive integer (in cents)." 
      });
    }

    // 💡 NOTE: The amount passed to Stripe must be in the smallest currency unit (cents).
    // Ensure the 'amount' from the client is already in cents, or convert it here.
    // Example: If the client sends $10.00, they should send '1000' as the amount.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, 
      currency: "usd",
      
      // Setting customer, description, or metadata is highly recommended for tracking
      // description: "Payment for Order XYZ", 
      
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) { // Catch block handles errors from Stripe API calls
    console.error("Stripe PaymentIntent Error:", error);
    
    // Provide a more descriptive error based on the Stripe API response (if available)
    const statusCode = error.statusCode || 500;
    const errorMessage = error.raw ? error.raw.message : "Failed to create Payment Intent";
    
    res.status(statusCode).json({
      error: errorMessage,
    });
  }
};