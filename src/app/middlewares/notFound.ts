import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export const notFound = (req: Request, res: Response, next: NextFunction) => {

    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        status: httpStatus.NOT_FOUND,
        message: "API NOT FOUND!",
        stack: process.env.NODE_ENV === 'development' ? 'Route not matched' : undefined,
    })
}