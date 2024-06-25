import Joi, { ObjectSchema } from 'joi';
import customJOIMessages from './customJoiMessage';

export const createOrderSchema:ObjectSchema = Joi.object({
    productId:Joi.string().required(),
    quantity: Joi.number().required(),
}).options({ messages: customJOIMessages });
