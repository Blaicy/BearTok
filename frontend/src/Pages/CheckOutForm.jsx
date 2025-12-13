import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { API_URL } from "../config"; // Make sure config.js exports API_URL

const CheckoutForm = ({ amount, order }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("card");

  // Stripe payment
  useEffect(() => {
    if (method !== "card" || !order) return;

    const createPaymentIntent = async () => {
      try {
        const res = await fetch(`${API_URL}/api/payments/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });

        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Stripe payment intent error:", err);
      }
    };

    createPaymentIntent();
  }, [method, amount, order]);

  // PayPal payment
  useEffect(() => {
    if (method !== "paypal" || !order) return;

    const container = document.getElementById("paypal-button-container");
    if (container) container.innerHTML = "";

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => {
      window.paypal?.Buttons({
        createOrder: (_, actions) =>
          actions.order.create({
            purchase_units: [{ amount: { value: (amount / 100).toFixed(2) } }],
          }),
        onApprove: async (_, actions) => {
          const details = await actions.order.capture();
          await saveOrder(details, "paypal");
          alert("Payment successful via PayPal!");
        },
        onError: () => alert("PayPal payment failed"),
      }).render("#paypal-button-container");
    };

    document.body.appendChild(script);
  }, [method, amount, order]);

  // Save order to backend
  const saveOrder = async (paymentDetails, paymentMethod = "card") => {
    try {
      await fetch(`${API_URL}/api/orders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.isNew ? null : order._id,
          userId: JSON.parse(localStorage.getItem("user"))?._id,
          itemName: order.itemName,
          size: order.size,
          quantity: order.quantity,
          price: order.price,
          paymentMethod,
          paymentStatus: "paid",
          stripePaymentIntentId: paymentDetails?.id || null,
          paypalOrderId: paymentDetails?.id || null,
        }),
      });

      window.location.href = "/orders";
    } catch (err) {
      console.error("Save order error:", err);
      alert("Failed to save order.");
    }
  };

  // Handle Stripe card payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card, billing_details: { email } },
    });

    if (result.error) {
      alert("Payment failed: " + result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      await saveOrder(result.paymentIntent, "card");
      alert("Payment successful via Card!");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Email */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Email address</label>
        <input
          type="email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3">Payment method</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer w-full">
            <input
              type="radio"
              value="card"
              checked={method === "card"}
              onChange={() => setMethod("card")}
            />
            <span>Card (Visa / Mastercard)</span>
          </label>

          <label className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer w-full">
            <input
              type="radio"
              value="paypal"
              checked={method === "paypal"}
              onChange={() => setMethod("paypal")}
            />
            <span>PayPal</span>
          </label>
        </div>
      </div>

      {/* Card Payment */}
      {method === "card" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Card details</label>
            <div className="p-3 border rounded-lg">
              <CardElement />
            </div>
          </div>
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Pay ${amount / 100}
          </button>
        </form>
      )}

      {/* PayPal */}
      {method === "paypal" && <div id="paypal-button-container" className="mt-6" />}
    </div>
  );
};

export default CheckoutForm;
