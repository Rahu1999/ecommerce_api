import { NextFunction, Request, Response } from 'express';

function errorHandlingMiddleWare(err: unknown, req: Request, res: Response, next: NextFunction) {
     // Error Type error handle
    if (err instanceof Error) {
        return res.status(500).json({ status: 500, error: err.message, data: null });
    }
    return res.status(500).json({ status: 500, error: "Something went wrong" });
}
export default errorHandlingMiddleWare;
