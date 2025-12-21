import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";

import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";

import stripe from "./src/config/stripe.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",        // Your local frontend
  "https://beartok.onrender.com"  // Your production frontend (if applicable)
];
const PORT = process.env.PORT || 5001;

// middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/", userRoutes);
app.use("/api/payments", paymentRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
