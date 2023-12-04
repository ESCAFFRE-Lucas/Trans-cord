import prisma from "../lib/db";
import { Translate } from "@prisma/client";

export const addTranslate = async (translation: Omit<Translate, "id"|"createdAt">) => {
    return prisma.translate.create({
        data: {
            text: translation.text,
            language: translation.language,
            translationText: translation.translationText,
            discordId: translation.discordId,

        }
    });
};

export const getTranslates = async () => {
    return prisma.translate.findMany();
}

export const getTranslateByDiscordId = async (discordId: string) => {
    return prisma.translate.findMany({
        where: {
            discordId: discordId
        }
    });
}