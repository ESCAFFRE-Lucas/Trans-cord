import express from "express";
import axios from "axios";
import prisma from "../lib/prisma";
import { signToken } from "../common/utils";

const login = async (req: express.Request, res: express.Response) => {
	if (!req.query.code) throw new Error('Code not provided.');

	const code = req.query.code as string;
	const params = new URLSearchParams({
		client_id: process.env.DISCORD_CLIENT_ID!,
		client_secret: process.env.DISCORD_CLIENT_SECRET!,
		grant_type: 'authorization_code',
		redirect_uri: process.env.DISCORD_REDIRECT_URI!,
		code,
	});

	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/x-www-form-urlencoded'
	};

	const response = await axios.post(
		'https://discord.com/api/oauth2/token',
		params,
		{
			headers
		}
	);

	const userResponse = await axios.get('https://discord.com/api/users/@me', {
		headers: {
			Authorization: `Bearer ${response.data.access_token}`,
			...headers
		}
	});

	const { id, username, avatar } = userResponse.data;

	const checkIfUserExists = await prisma.user.findFirst({
		where: { discordId: id }
	})

	let user;

	if (checkIfUserExists) {
		user = await prisma.user.update({
			where: {
				discordId: id,
			},
			data: { username }
		})

	} else {
		user = await prisma.user.create({
			data: { username, discordId: id }
		})
	}

	const token = signToken({ id: user.id, discordId: id, role: user.role, username: user.username });

	return res.json({ message: "Success", status: 200, data: token });
}

export default {
	login
};