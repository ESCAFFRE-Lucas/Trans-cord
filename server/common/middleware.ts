import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/httpException";

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    console.log("error");

    const message = error.message || 'Something went wrong';
    if (process.env.NODE_ENV === "test") {
        console.log(error);
    }

   res.status(status).send({
        status,
        message,
    })
}