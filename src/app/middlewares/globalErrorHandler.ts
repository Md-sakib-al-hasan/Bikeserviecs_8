import { NextFunction, Request, Response } from "express"
import httpStatus, { status } from "http-status"

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        status:httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong!",
        stock: err.stack || "No stack trace available"
    })
};

export default globalErrorHandler;