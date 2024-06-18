import { Router } from "express";
import translateController from "./translate.controller";
import { checkAuth } from "../common/middleware";

const translateRouter = Router();

translateRouter.post('/', translateController.translateString);

translateRouter.get('/:discordId', translateController.getTranslationsByDiscordId);

translateRouter.get('/user/:userId', checkAuth, translateController.getTranslationsByUserId);

translateRouter.get('/language/:userId', checkAuth, translateController.getLanguageTranslationsByUserId);

export default translateRouter;