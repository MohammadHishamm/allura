import express from 'express';
import { createContact, getAllContacts } from '../services/contactService';

const router = express.Router();

// Create a new contact
router.post('/', async (req, res) => {
  try {
    console.log("📩 Contact form request body:", req.body);
    const result = await createContact(req.body);
    console.log("✅ Contact form result:", result);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error("❌ Contact form error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all contacts (for admin purposes)
router.get('/', async (req, res) => {
  try {
    const result = await getAllContacts();
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error("❌ Get contacts error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
