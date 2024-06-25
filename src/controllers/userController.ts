import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import sendSuccessResponse from '../middleware/success-handler';

export const register = async (req: Request, res: Response, next:NextFunction) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    sendSuccessResponse(req, res, { token })
  } catch (err) {
    next(err)
  }
};

export const login = async (req: Request, res: Response, next:NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    sendSuccessResponse(req, res, { token })
  } catch (err) {
   next(err)
  }
};
