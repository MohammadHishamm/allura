import express from 'express';
import { createJoinUsApplication, getAllJoinUsApplications, updateApplicationStatus } from '../services/joinUsService';

const router = express.Router();

// Create a new join us application
router.post('/', async (req, res) => {
  try {
    console.log("📩 Join Us application request body:", req.body);
    const result = await createJoinUsApplication(req.body);
    console.log("✅ Join Us application result:", result);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error("❌ Join Us application error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all join us applications (for admin purposes)
router.get('/', async (req, res) => {
  try {
    const result = await getAllJoinUsApplications();
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error("❌ Get join us applications error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update application status (for admin purposes)
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await updateApplicationStatus(id, status);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error("❌ Update application status error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
