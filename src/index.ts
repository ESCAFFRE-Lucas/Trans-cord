import express from 'express';
import dotenv from "dotenv";
import swaggerJSDoc, { Options } from "swagger-jsdoc";
import * as OpenApiValidator from 'express-openapi-validator';
import swaggerUi from "swagger-ui-express";
import { errorMiddleware } from "./common/middleware";
import translateRouter from "./translate/translate.router";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

interface SwaggerDefinition {
    openapi: string;
    info: {
        title: string;
        version?: string;
    };
}

interface SwaggerOptions {
    definition: SwaggerDefinition;
    apis: string[];
}

const swaggerOptions: SwaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API',
            version: '1.0.0',
        }
    },
    apis: ['./src/**/*.ts', './src/**/*.yaml', './src/**/*.yml'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions as Options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(OpenApiValidator.middleware({
    apiSpec: './src/swagger-config.yml',
}));

app.use('/translate', translateRouter);

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.use(errorMiddleware)

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Swagger is running on http://localhost:${port}/api-docs`)
    });
}