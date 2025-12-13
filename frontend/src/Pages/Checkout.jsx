import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import CheckoutForm from "./CheckOutForm";

const Checkout = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderFromShop = location.state?.product;
    const orderId = searchParams.get("orderId");

    if (orderFromShop) {
      setOrder({ ...orderFromShop, isNew: true });
    } else if (orderId) {
      fetch(`/api/orders/single/${orderId}`)
        .then((res) => res.json())
        .then((data) => setOrder({ ...data, isNew: false }))
        .catch(() => alert("Failed to load order"));
    }
  }, [location.state, searchParams]);

  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading checkout...
      </div>
    );

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 flex items-start justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
          Checkout
        </h1>

        <div className="bg-white shadow-lg rounded-2xl p-5 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="space-y-1 text-sm sm:text-base">
            <p>
              <span className="font-medium">Product:</span> {order.itemName}
            </p>
            <p>
              <span className="font-medium">Size:</span> {order.size}cm
            </p>
            <p>
              <span className="font-medium">Quantity:</span> {order.quantity}
            </p>
            <p className="text-lg font-semibold mt-3">
              Total: ${order.price}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-5 sm:p-6">
          <CheckoutForm amount={order.price * 100} order={order} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
