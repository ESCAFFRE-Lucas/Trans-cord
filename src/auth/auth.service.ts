import prisma from "../lib/db";

export const addUser = async (user: any) => {
    return prisma.user.create({
        data: user
    });
}

export const getUsers = async () => {
    return prisma.user.findMany();
}

export const getUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: {
            id: id
        }
    });
}