import { isAxiosError } from "axios";

export const httpStatus = (error: unknown) => (isAxiosError(error) ? error.response?.status : undefined);

export const requestErrorKey = (error: unknown) => (httpStatus(error) === 429 ? "errors.tooMany" : "errors.generic");
