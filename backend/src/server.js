// --- server.js (Refactored) ---

import express from 'express';
import orderRoutes from './routes/orderRoutes.js';
import { connectDB } from './config/db.js';

// 1. IMPORT AND EXECUTE DOTENV FIRST
import dotenv from 'dotenv';
dotenv.config();

// 2. INITIALIZE STRIPE HERE (Safely after the key is loaded)
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// 3. EXPORT the initialized client so other files (like paymentRoutes.js) can use it
export { stripe };

import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from './routes/userRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'


const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(cors());
app.use(express.json());

// connect to DB
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/", userRoutes);
app.use("/api/payments", paymentRoutes);


// start server
app.listen(PORT, () => {
  console.log("Server running!", PORT);
});