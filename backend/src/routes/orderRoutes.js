// routes/orderRoutes.js
import express from "express";
import { createOrUpdateOrder, getUserOrders, cancelOrder, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrUpdateOrder);
router.get("/:userId", getUserOrders);
router.get("/single/:id", getOrderById); // for resuming pending order
router.patch("/cancel/:id", cancelOrder);

export default router;
