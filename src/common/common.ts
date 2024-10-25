import { errorTypes } from "../errors/error";

export const createResponseObject = (statusCode: number, body: any, res: any) => {
  return res.status(statusCode).json(body);
};

export const handleErrors = (error: any, res: any) => {
  const { message, statusCode } = checkErrorType(error);
  return createResponseObject(statusCode!, { message: message }, res);
};

const checkErrorType = (
  error: any
): {
  message: string | undefined;
  statusCode: number | undefined;
} => {
  let message, statusCode;
  for (const errorType of errorTypes) {
    if (error instanceof errorType) {
      message = error.message;
      statusCode = error.statusCode;
      break;
    }
  }
  return { message, statusCode };
};

export const isNullOrUndefined = (obj: any): boolean => {
  return obj === null || obj === undefined;
};
