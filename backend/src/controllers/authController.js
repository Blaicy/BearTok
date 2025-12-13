// authController.js - FIX 1 (Security)

import User from "../models/User.js";
import { generateToken } from "../utils/auth.js"; 
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const token = generateToken(user._id);

        res.json({
            token,
            user: { 
                name: user.name, 
                email: user.email 
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// NOTE: This requires your User model to hash passwords on save/update!