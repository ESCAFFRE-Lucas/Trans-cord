import prisma from '../lib/prisma';
import exp from 'constants';

export const addUser = async (user: any) => {
	return prisma.user.create({
		data: user
	});
};

export const getUsers = async () => {
	return prisma.user.findMany();
};

export const getUserById = async (id: string) => {
	return prisma.user.findUnique({
		where: { id }
	});
};

export const getUserByUsername = async (username: string) => {
	return prisma.user.findFirst({
		where: { username }
	});
}