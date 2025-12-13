// controllers/orderController.js
import Order from "../models/Order.js";

// Create or update order after payment
export const createOrUpdateOrder = async (req, res) => {
  const {
    orderId, // optional if resuming
    userId,
    itemName,
    size,
    quantity,
    price,
    paymentMethod,
    paymentStatus,
    stripePaymentIntentId,
    paypalOrderId,
  } = req.body;

  try {
    let order;

    if (orderId) {
      // Update existing pending order
      order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ message: "Order not found" });
      order.paymentMethod = paymentMethod;
      order.paymentStatus = paymentStatus;
      order.stripePaymentIntentId = stripePaymentIntentId || order.stripePaymentIntentId;
      order.paypalOrderId = paypalOrderId || order.paypalOrderId;
      await order.save();
    } else {
      // Create new order
      order = new Order({
        userId,
        itemName,
        size,
        quantity,
        price,
        paymentMethod,
        paymentStatus,
        stripePaymentIntentId,
        paypalOrderId,
      });
      await order.save();
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save order" });
  }
};

// Get orders for a user
export const getUserOrders = async (req, res) => {
  const { userId } = req.params;
  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  res.json(orders);
};

// Cancel order
export const cancelOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  if (order.paymentStatus !== "pending")
    return res.status(400).json({ message: "Cannot cancel this order" });

  order.paymentStatus = "cancelled";
  await order.save();
  res.json(order);
};

// Get single order (for resuming payment)
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};
