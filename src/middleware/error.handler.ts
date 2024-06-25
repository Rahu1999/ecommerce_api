import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import ApiError from '../utils/apiError';

function errorHandlingMiddleWare(err: unknown, req: Request, res: Response, next: NextFunction) {

    // JOI Error
    if (err instanceof Joi.ValidationError) {

        type Obj = {
            label: string | number,
            msg: string
        };
        const error: Array<Obj> = [];
        err.details.forEach((e) => {
            const data = {
                label: e.path[0],
                msg: e.message,
            };
            error.push(data);
        });
        return res.status(422).json({ status: 422, data: null, error: { message: 'Validation Error', errors: error } });
    }

    // API Error
    if (err instanceof ApiError) {
        return res.status(err.code).json({ status: err.code, data: null, error: err.message });
    }
    return res.status(500).json({ status: 500, error: "Something went wrong" });
}
export default errorHandlingMiddleWare;
