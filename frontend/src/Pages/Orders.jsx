import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchOrders = async () => {
    const res = await fetch(`/api/orders/${userId}`);
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    await fetch(`/api/orders/cancel/${id}`, { method: "PATCH" });
    fetchOrders();
  };

  const continuePayment = (order) => {
    window.location.href = `/checkout?orderId=${order._id}`;
  };

  return (
    <div className="relative min-h-screen px-4 sm:px-6 py-8">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/Bg2.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center sm:text-left">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-white/80 text-center sm:text-left">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white/90 rounded-2xl shadow-lg p-4 sm:p-6 relative"
              >
                <p className="font-semibold text-lg">{order.itemName}</p>
                <p>Size: {order.size}cm</p>
                <p>Quantity: {order.quantity}</p>
                <p className="font-semibold">Total: ${order.price}</p>
                <p>
                  Payment: {order.paymentMethod} ({order.paymentStatus})
                </p>

                {order.paymentStatus === "pending" && (
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => continuePayment(order)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Continue Payment
                    </button>
                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
