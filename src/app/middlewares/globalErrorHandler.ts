
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Prisma } from '@prisma/client'
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import AppError from '../errors/appError';
import  httpStatus  from 'http-status';
import { getUniqueFieldsError } from '../errors/dupliccitonerrr';




const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = 500;
  let message = 'Something went wrong!';
  

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
  } 
  else if (err instanceof Prisma.PrismaClientValidationError)
  {
    statusCode = httpStatus.CONFLICT;
    message = err.message;
  }
  else if (err.code === 'P2002') {
    statusCode =httpStatus.CONFLICT ;
    message = getUniqueFieldsError(err.message)[0];
  } 
  else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = 500;
    message = err.message;
    }
  else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
   
  } else if (err instanceof Error) {
    message = err.message;
    
  }

  // Handle the error response
  res.status(statusCode).json({
    success: false,
    status:statusCode,
    message: message || "Something went wrong!",
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });

 
  return;
};

export default globalErrorHandler;


