import * as deepl from 'deepl-node';
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

const authKey = process.env.API_KEY_DEEPL ?? '';
const translator = new deepl.Translator(authKey);
const translateString = async (req: Request, res: Response) => {
    const { text, language, discordId } = req.body;
    const translation = await translator.translateText(text, null, language);
    return res.status(200).send({message: "translation fetched", data: { translation, discordId }})
}

export default {
    translateString
}