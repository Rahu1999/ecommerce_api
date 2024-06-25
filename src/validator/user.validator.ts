import Joi, { ObjectSchema } from 'joi';
import customJOIMessages from './customJoiMessage';

export const registerSchema:ObjectSchema = Joi.object({
    name:Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
}).options({ messages: customJOIMessages });

export const loginSchema:ObjectSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
}).options({ messages: customJOIMessages });
