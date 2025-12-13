import jwt from 'jsonwebtoken';

// ⚠️ IMPORTANT: Get this from a .env file (e.g., process.env.JWT_SECRET)
// Use a secure, long, random string in production!
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
const JWT_SECRET = process.env.JWT_SECRET; 

// Function to generate a JWT
export const generateToken = (userId) => {
    // Payload includes the user ID
    return jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: '7d', // Token valid for 7 days
    });
};