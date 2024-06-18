import { Request, Response } from 'express';
import prisma from "../lib/prisma";
import { signToken } from "../common/utils";

const editProfile = async (req: Request, res: Response) => {

	const id = res.locals.user.id;

	await prisma.user.update({
		where: { id },
		data: req.body
	});


	const user = await prisma.user.findFirst({
		where: { id }
	})

	if (!user) {
		return res.status(401).json({ status: 401, message: "Unauthorized", data: null })
	}

	const token = signToken({ username: user.username, discordId: user.discordId, role: user.role, id: user.role });
	return res.json({ status: 200, message: "Successfully updated profile", data: token })
}

const getGraph = async (req: Request, res: Response) => {
	const discordId = res.locals.user.discordId;


	const translations = await prisma.translate.groupBy({
		by: ['language', 'createdAt'],
		_count: {
			id: true,
		},
		where: { discordId },
	});

	const finals = translations.map((translation) => {

		return {
			date: new Date(translation.createdAt).getFullYear(),
			...translation,
		}
	})

	return res.send({ status: 200, message: "Successfully get graph", data: finals });
}

export default {
	editProfile,
	getGraph
}