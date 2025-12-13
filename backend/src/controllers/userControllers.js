import User from "../models/User.js";

// SIGN UP
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const newUser = await User.create({ name, email, password });
    return res.status(201).json(newUser);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// LOGIN
export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(401).json({ message: "Invalid password" });

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
