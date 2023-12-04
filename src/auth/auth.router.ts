import { Router } from "express";
import AuthController from "./auth.controller";
import { checkFields, checkIfUserExists, checkUserAlreadyExists } from "./auth.middleware";
import { checkAuth, userIsAdmin } from "../common/middleware";


const authRouter = Router();

authRouter.post('/register', checkFields, checkUserAlreadyExists, AuthController.register);
authRouter.post('/login', checkFields, checkIfUserExists, AuthController.login);

authRouter.get('/', checkAuth, userIsAdmin, AuthController.getAllUsers);
authRouter.get('/:id', checkAuth, userIsAdmin, AuthController.getUserByHisId);
export default authRouter;