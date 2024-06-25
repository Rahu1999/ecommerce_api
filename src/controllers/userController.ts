import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import sendSuccessResponse from '../middleware/success-handler';
import { loginSchema, registerSchema } from '../validator/user.validator';
import ApiError from '../utils/apiError';

export const register = async (req: Request, res: Response, next:NextFunction) => {
  
  try {
    const { name, email, password } = await registerSchema.validateAsync( req.body);
    let user = await User.findOne({ email });
    if (user) return next(ApiError.customError(400,'User already exists'));

    user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    sendSuccessResponse(req, res, { token })
  } catch (err) {
    next(err)
  }
};

export const login = async (req: Request, res: Response, next:NextFunction) => {
  
  try {
    const { email, password } = await loginSchema.validateAsync(req.body);
    const user = await User.findOne({ email });
    if (!user) return next(ApiError.badRequest())

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return next(ApiError.badRequest())

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    sendSuccessResponse(req, res, { token })
  } catch (err) {
   next(err)
  }
};
