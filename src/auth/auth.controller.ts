import prisma from "../lib/db";
import { NextFunction, Request, Response } from "express";
import { addUser, getUserById, getUsers } from "./auth.service";
import { signToken } from "../common/utils";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log(username, password)
    try {
        const user = await addUser({
            username: username,
            password: await bcrypt.hash(password, 10),
            discordId: "123456789",
            role: "admin"
        });
        const token = signToken({ id: user?.id, username: user?.username, role: user?.role });
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json(error);
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username,
            }
        });
        if (!bcrypt.compareSync(password, user?.password!)) {
            next({ status: 401, message: "Unauthorized" })
        }
        const token = signToken({ id: user?.id, username: user?.username, role: user?.role });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json(error);
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    const users = getUsers();
    if (!users) {
        res.status(404).json({message: "No users found"});
    }
    res.status(200).json({message: "Users fetched", data: users});
}

const getUserByHisId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = getUserById(id);
    if (!user) {
        res.status(404).json({message: "User not found"});
    }
    res.status(200).json({message: "User fetched", data: user});
}

export default {
    register,
    login
}