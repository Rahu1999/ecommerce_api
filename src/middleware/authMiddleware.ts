import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).send('User not found');

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

export default authMiddleware;
