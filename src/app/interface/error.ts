

export type TGenericErrorResponse = {
  
  statusCode: number;
  message: string;
  stack: string | null | undefined;
};


export type ValidationError = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};