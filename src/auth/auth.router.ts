import { Router } from "express";
import AuthMiddleware from "./auth.middleware";
import AuthController from "./auth.controller";


const authRouter = Router();

authRouter.post('/register', AuthMiddleware.checkFields, AuthMiddleware.checkUserAlreadyExists, AuthController.register);
authRouter.post('/login', AuthMiddleware.checkFields, AuthController.login);
export default authRouter;