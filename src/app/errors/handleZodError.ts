import { ZodError, ZodIssue } from 'zod';
import {  TGenericErrorResponse, ValidationError } from '../interface/error';



const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const requiredFields = err.issues
    .filter((issue) => issue.message === "Required")
    .map((issue) => issue.path.at(-1));

  const message = requiredFields.length === 0 ? "Validation error"
  
      : requiredFields.length === 1
      ? `${requiredFields[0]} is required`
      : `${requiredFields.slice(0, -1).join(", ")} and ${
          requiredFields.at(-1)
        } are required`;

  return {
    statusCode: 400,
    message,
    stack: err?.stack,
  };
};


export default handleZodError;
