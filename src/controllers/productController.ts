
import { NextFunction, Request, Response } from 'express';
import Product from '../models/Product';
import sendSuccessResponse from '../middleware/success-handler';

export const createProduct = async (req: Request, res: Response,next:NextFunction) => {
  const { name, description, price, stock } = req.body;

  try {
    const product = new Product({ name, description, price, stock });
    await product.save();
    sendSuccessResponse(req, res, { product })
  } catch (err) {
    next(err)
  }
};

export const getProducts = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const products = await Product.find();
    sendSuccessResponse(req, res, { products })
  } catch (err) {
    next(err)
  }
};
