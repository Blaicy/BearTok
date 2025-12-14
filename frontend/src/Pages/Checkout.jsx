import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { API_URL } from "../config";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const orderFromShop = location.state?.product;
    const orderId = searchParams.get("orderId");

    const initPayment = async (orderData) => {
      try {
        const res = await fetch(
          `${API_URL}/api/payments/create-payment-intent`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: Math.round(orderData.price * 100),
              orderId: orderData.isNew ? null : orderData._id,
            }),
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setOrder(orderData);
        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.message);
      }
    };

    if (orderFromShop) {
      initPayment({ ...orderFromShop, isNew: true });
    } else if (orderId) {
      fetch(`${API_URL}/api/orders/single/${orderId}`)
        .then(res => res.json())
        .then(data => initPayment({ ...data, isNew: false }))
        .catch(() => setError("Failed to load order"));
    } else {
      setError("No order found");
    }
  }, [location.state, searchParams]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!clientSecret || !order) return <div>Loading checkout…</div>;

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret }}
    >
      <CheckoutForm order={order} clientSecret={clientSecret} />
    </Elements>
  );
};

export default Checkout;
