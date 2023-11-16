import { Request, Response, NextFunction } from "express";
import prisma from "../lib/db";

const checkFields = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || !password) {
       next({status: 400, message: "Missing fields"})
    } else {
        next();
    }
}

const checkUserAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
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

export default {
    checkFields,
    checkUserAlreadyExists
}