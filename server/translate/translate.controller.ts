import * as deepl from 'deepl-node';
import { Request, Response } from 'express';
import { addTranslate, createUserWithDiscordId, deleteTranslateById, getTranslateByDiscordId, getUserByDiscordId } from './translate.service';
import redis from '../lib/redis';
import { type TargetLanguageCode } from 'deepl-node';


const translator = new deepl.Translator(process.env.API_KEY_DEEPL!);
const translateString = async (req: Request, res: Response) => {
	const { text, language, discordId } = req.body;
	let preferredLanguage = await redis.get(discordId);

	if (!preferredLanguage) {
		preferredLanguage = 'en-GB';
		await redis.set(discordId, 'en-GB');
	}

	if (language) {
		preferredLanguage = language;
	}

	const translationResponse = await translator.translateText(text, null, preferredLanguage as TargetLanguageCode);
	const { text: translationText } = Array.isArray(translationResponse) ? translationResponse[0] : translationResponse;

	const user = await getUserByDiscordId(discordId);
	if (!user) {
		await createUserWithDiscordId(discordId);
	}

	const translationAdded = await addTranslate({
		text,
		translationText,
		discordId,
		language: preferredLanguage!
	});

	return res.status(200).send({ message: 'Translation done', data: translationAdded });
};

const getTranslationsByDiscordId = async (req: Request, res: Response) => {
	const { discordId } = req.params;
	const translations = await getTranslateByDiscordId(discordId);
	return res.status(200).send({ message: 'translation fetched', data: translations });
};

const deleteTranslation = async (req: Request, res: Response) => {
	const { translateId } = req.params;
	const translate = await deleteTranslateById(translateId);
	return res.status(200).send({ message: 'translation fetched', data: translate });
};

const changePreferredLang = async (req: Request, res: Response) => {
	const { language, discordId } = req.body;
	redis.set(discordId, language);
	return res.status(200).send({ message: 'translation fetched', data: { language, discordId } });
};


export default {
	translateString,
	getTranslationsByDiscordId,
	deleteTranslation,
	changePreferredLang
};