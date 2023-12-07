import { Router } from 'express';
import translateController from './translate.controller';
import { checkRequestIsFromDiscord } from '../common/middleware';

const translateRouter = Router();

translateRouter.post('/', checkRequestIsFromDiscord, translateController.translateString);

translateRouter.patch('/', checkRequestIsFromDiscord, translateController.changePreferredLang);

translateRouter.get('/:discordId', checkRequestIsFromDiscord, translateController.getTranslationsByDiscordId);
translateRouter.delete('/:translateId', checkRequestIsFromDiscord, translateController.deleteTranslation);


export default translateRouter;