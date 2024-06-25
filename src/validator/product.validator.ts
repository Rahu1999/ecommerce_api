import Joi, { ObjectSchema } from 'joi';
import customJOIMessages from './customJoiMessage';

export const createProductSchema:ObjectSchema = Joi.object({
    name:Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
}).options({ messages: customJOIMessages });
