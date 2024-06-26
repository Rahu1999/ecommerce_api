import { NextFunction, Request, Response } from 'express';
import Product from '../models/Product';
import Order from '../models/Order';
import sendSuccessResponse from '../middleware/success-handler';
import { createOrderSchema } from '../validator/order.validator';
import axios from 'axios';
import ApiError from '../utils/apiError';
import Payment from '../models/Payment';

export const createOrder = async (req: Request, res: Response,next:NextFunction) => {
  
  try {
    const { productId, quantity } = await createOrderSchema.validateAsync(req.body);
    const product = await Product.findById(productId);
    if (!product) return next(ApiError.customError(404,'Product not found' ));

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
export const paymentRequest = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { productId, quantity } = await createOrderSchema.validateAsync(req.body);
    const product = await Product.findById(productId);
    if (!product) return next(ApiError.customError(404,'Product not found' ));

    const amount = product.price * quantity;
    const order = new Order({ user: req.user!.id, product: productId, quantity, total:amount, isPaid:false});
    await order.save();
    try {
      const response = await axios.post('https://api.stripe.com/v1/charges', { amount });
      if(response.data && response.data.isPaid){
        // We can also call success api url and inside the success api we can update the isPaid true
        await Order.findByIdAndUpdate(order._id, { isPaid: true }, { new: true });
        // create entry in payment table
        const payment = new Payment({ user: req.user!.id, order: order._id, amount});
        await payment.save();
        sendSuccessResponse(req, res, { message: "Your order successfully created!" }) 
      }

    } catch (error) {
      next(error)
    }

  } catch (err) {
    next(err)
  }
};
export const fetchLogistics = async (req: Request, res: Response,next:NextFunction) => {
  try {
      const response = await axios.get('https://api.logistics.com/v1/shipments');
      if(response.data && response.data.isCompleted){
        sendSuccessResponse(req, res, { message: "Your order shipped created!" ,...response.data}) 
      }else{
        next(ApiError.badRequest())
      }

  } catch (err) {
    next(err)
  }
};
