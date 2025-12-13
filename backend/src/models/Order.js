// models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  itemName: String,
  size: String,
  quantity: Number,
  price: Number,
  paymentMethod: { type: String }, // "card" | "paypal"
  paymentStatus: { type: String, default: "pending" }, // pending | paid | cancelled
  stripePaymentIntentId: String,
  paypalOrderId: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", OrderSchema);
