import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';
import { errorMiddleware } from './common/middleware';
import translateRouter from './translate/translate.router';
import authRouter from './auth/auth.router';
import redis from './lib/redis';
import cors from 'cors'

import 'dotenv/config';
import discordRouter from "./discord/discord.router";
import userRouter from "./user/user.router";
import { Client, IntentsBitField } from "discord.js";
import prisma from "./lib/prisma";

const port = +(process.env.PORT || 3000);
export const app = express();

app.use(cors());

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

const swaggerOptions: SwaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Express API',
			version: '1.0.0',
		}
	},
	apis: [`${__dirname}/**/*.ts`, `${__dirname}/**/*.yaml`, `${__dirname}/**/*.yml`],
};

app.get('/', async (req, res) => {
	redis.set('hello', Math.random().toString());
	const value = await redis.get('hello');
	return res.send({ message: value });
});

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// app.use(OpenApiValidator.middleware({
//  apiSpec: `${__dirname}/swagger-config.yml`,
// }));

app.get("/health", (req, res) => {
	return res.json({ healthy: true })
});

app.get("/welcome", async (req, res) => {
	const serverCount = client.guilds.cache.size;
	const translationCount = await prisma.translate.count();
	const languageCount = 25;

	return res.json({
		message: "Success",
		status: 200,
		data: {
			serverCount,
			translationCount,
			languageCount,
		}
	})


})

app.use('/translate', translateRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/api/auth/discord/redirect', discordRouter);

app.use(errorMiddleware)

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}/`);
		console.log(`Swagger is running on http://localhost:${port}/api-docs`);
	});
}