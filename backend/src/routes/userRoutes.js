import express from "express";
import { signUp, logIn } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/logIn", logIn);

export default router;
