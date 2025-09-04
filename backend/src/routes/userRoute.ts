import express from 'express';
import { register, login } from '../services/userService';

const router = express.Router();


router.post('/register', async (req, res) => {
  try {
    console.log("📩 Register request body:", req.body);
    const data = req.body;
    const result = await register(data);
    console.log("✅ Register result:", result);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error("❌ Register error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } 
});

router.post('/login', async (req, res) => {
  try {
    const findUser = await login(req.body);
    res.status(findUser.statusCode).json(findUser.data); // <-- use json()
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export default router;