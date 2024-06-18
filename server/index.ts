import express from 'express';
import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import * as OpenApiValidator from 'express-openapi-validator';
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';
import { errorMiddleware } from './common/middleware';
import translateRouter from './translate/translate.router';
import authRouter from './auth/auth.router';
import redis from './lib/redis';
import dotenv from 'dotenv';

dotenv.config();

const port = +(process.env.PORT || 3000);
const app = express();


const swaggerOptions: SwaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Express API',
			version: '1.0.0',
		}
	},
	apis: [`${__dirname}/**/*.ts`, `${__dirname}/**/*.yaml`, `${__dirname}/*.yml`],
};

app.get('/', async (req, res) => {
	redis.set('hello', 'world');
	const value = await redis.get('hello');
	return res.send({ message: value });
});

const swaggerDocs = swaggerJSDoc(swaggerOptions as Options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.use('/translate', translateRouter);
app.use('/auth', authRouter);

app.get('/hello', (req, res) => {
	res.send('Hello World!');
});

app.use(errorMiddleware)

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}/`);
		console.log(`Swagger is running on http://localhost:${port}/api-docs`);
	});
}

export default app;