import { Request, Response, NextFunction } from "express";
import prisma from "../lib/db";

export const checkFields = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || !password) {
       next({status: 400, message: "Missing fields"})
    } else {
        next();
    }
}

export const checkUserAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username,
            }
        });
        if (user) {
            next({status: 400, message: "User already exists"});
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

export const checkIfUserExists = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username,
            }
        });
        if (!user) {
            next({status: 400, message: "User does not exist"});
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}