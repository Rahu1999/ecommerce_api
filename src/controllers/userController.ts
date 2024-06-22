import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isError } from '../utils/common';

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (isError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Server error' });
      }
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    if (isError(error)) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Server error' });
      }
  }
};

export { register, login };
