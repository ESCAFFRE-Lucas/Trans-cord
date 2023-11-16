import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/httpException";

export const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    if (process.env.NODE_ENV === "test") {
        console.log(error);
    }
    response.status(status).send({
        status,
        message,
    })
};