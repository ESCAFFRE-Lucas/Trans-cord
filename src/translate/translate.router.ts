import { Router } from "express";
import translateController from "./translate.controller";
import { checkAuth } from "../common/middleware";

const translateRouter = Router();

translateRouter.post('/', checkAuth, translateController.translateString);

translateRouter.get('/:discordId', checkAuth, translateController.getTranslationsByDiscordId);

export default translateRouter;