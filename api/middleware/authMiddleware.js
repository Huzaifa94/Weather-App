import jwt from 'jsonwebtoken';
import { User } from '../model/user.js';

const JWT_SECRET = '911';

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]; 

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

     
      const user = await User.findById(decoded.userId).select('email username');

      if (!user) {
        return res.status(403).json({ error: 'User not found' });
      }

      req.user = {
        id: decoded.userId,
        email: user.email,
        username: user.username
      };

      next();
    } catch (error) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
  } else {
    return res.status(401).json({ error: 'No token provided, authorization denied' });
  }
};
