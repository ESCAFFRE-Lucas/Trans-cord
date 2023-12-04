import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export type JwtPayload  =  {
    id: string | undefined
    username: string | undefined
    role: string | undefined
    discordId: string | undefined
}

export const signToken = (payload: JwtPayload) => {
    return jwt.sign(payload, process.env.JWT_SECRET ?? '', {
        expiresIn: '2d'
    })
}

export const isValidUUID = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)){
        return next({status: 400, message: "Invalid UUID"});
    }
    next();
}