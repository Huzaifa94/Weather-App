import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {
 
  res.json({ message: `Welcome, user with ID: ${req.user.userId}` });
});

export default router;
