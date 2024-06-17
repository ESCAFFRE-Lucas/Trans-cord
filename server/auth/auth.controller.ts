import { NextFunction, Request, Response } from 'express';
import { addUser, getUserById, getUserByUsername, getUsers } from './auth.service';
import bcrypt from 'bcrypt';
import { signToken } from '../common/utils';
import HttpException from '../exceptions/httpException';

const register = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	try {
		const user = await addUser({
			username: username,
			password: await bcrypt.hash(password, 10),
		});

		const token = signToken({ id: user?.id, username: user?.username, role: user?.role, discordId: user?.discordId, });

		return res.status(201).send({ status: 201, message: "Success", data: token });
	} catch (error) {
		return res.status(400).send(error);
	}
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	const { username, password } = req.body;
	try {
		const user = await getUserByUsername(username);
		if (!user) {
			next(new HttpException(400, 'Invalid credentials'));
			return;
		}
		if (!bcrypt.compareSync(password, user.password)) {
			next(new HttpException(401, 'Invalid credentials'));
		}
		const token = signToken({ id: user.id, username: user.username, role: user.role, discordId: user.discordId });
		res.status(200).json({ status: 200, message: "Success", data: token });
	} catch (error) {
		next(new HttpException(400, 'Something went wrong'));
		console.log('Error:', error);
		return;
	}
};

const getAllUsers = async (req: Request, res: Response) => {
	const users = await getUsers();
	if (!users) {
		res.status(404).json({ message: 'No users found' });
	}
	res.status(200).json({ message: 'Users fetched', data: users });
};

const getUserByHisId = async (req: Request, res: Response) => {
	const { id } = req.params;
	const user = await getUserById(id);
	if (!user) {
		res.status(404).json({ message: 'User not found' });
	}
	res.status(200).json({ message: 'User fetched', data: user });
};

export default {
	register,
	login,
	getAllUsers,
	getUserById: getUserByHisId
};