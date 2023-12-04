import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/httpException";
import prisma from "../lib/db";
import jwt from "jsonwebtoken";
import { JwtPayload } from "./utils";

export const checkToken = async (
    token: string | undefined
): Promise<[boolean, null | JwtPayload]> => {
    if (!token) return [false, null];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        return [true, payload];
    } catch (error) {
        return [false, null];
    }
};

export const checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const [isValid, payload] = await checkToken(req.headers?.authorization);
    if (isValid) {
        res.locals.user = payload;
        next();
        return;
    }
    next({status: 401, message: "Unauthorized"})
    return;
};

export const userIsAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userRole = await prisma.user.findUnique({
            where: {
                id: res.locals.user.id
            }
        });
        if (userRole?.role === "admin") {
            next();
            return;
        }
        next({status: 403, message: "Forbidden"})
    } catch (error) {
    next({status: 500, message: "Internal Server Error"});
    }
};

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