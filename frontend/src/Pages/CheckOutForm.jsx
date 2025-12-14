import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ order }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders`,
      },
      redirect: "if_required",
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      alert("Payment successful!");
      navigate("/orders");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
      <PaymentElement />
      <button
        disabled={!stripe || loading}
        className="w-full py-3 text-white bg-blue-600 rounded-lg"
      >
        {loading ? "Processing…" : `Pay $${order.price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
