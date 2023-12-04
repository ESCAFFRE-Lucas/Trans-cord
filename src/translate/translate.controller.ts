import * as deepl from 'deepl-node';
import dotenv from "dotenv";
import { Request, Response, text } from "express";
import { addTranslate, getTranslateByDiscordId } from "./translate.service";

dotenv.config();

const authKey = process.env.API_KEY_DEEPL ?? '';
const translator = new deepl.Translator(authKey);


const translateString = async (req: Request, res: Response) => {
    const { text, language, discordId } = req.body;
    const translationResponse = await translator.translateText(text, null, language);
    const translation = Array.isArray(translationResponse) ? translationResponse[0] : translationResponse;
    const translationAdded = await addTranslate({ text, language, translationText: translation.text ,discordId });

    return res.status(200).send({message: "translation added", data: translationAdded})
}

const getTranslationsByDiscordId = async (req: Request, res: Response) => {
    const { discordId } = req.params;
    const translation = await getTranslateByDiscordId(discordId);
    return res.status(200).send({message: "translation fetched", data: [...translation]})
}

export default {
    translateString,
    getTranslationsByDiscordId
}