import { NextFunction, Request, Response } from 'express';
import Product from '../models/Product';
import Order from '../models/Order';
import sendSuccessResponse from '../middleware/success-handler';
import { createOrderSchema } from '../validator/order.validator';

export const createOrder = async (req: Request, res: Response,next:NextFunction) => {
  
  try {
    const { productId, quantity } = await createOrderSchema.validateAsync(req.body);
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    const total = product.price * quantity;
    const order = new Order({ user: req.user!.id, product: productId, quantity, total });
    await order.save();

    sendSuccessResponse(req, res, { order })
  } catch (err) {
    next(err)
  }
};

export const getOrders = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const orders = await Order.find({ user: req.user!.id }).populate('product');
    sendSuccessResponse(req, res, { orders })

  } catch (err) {
    next(err)
  }
};
