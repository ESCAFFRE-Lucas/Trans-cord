
import { Translate } from "@prisma/client";
import prisma from '../lib/prisma';

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

export const getUserByDiscordId = async (discordId: string) => {
	return prisma.user.findFirst({
		where: { discordId }
	});
}
export const createUserWithDiscordId = async (discordId: string) => {
	return prisma.user.create({
		data: { discordId }
	});
}

export const getTranslates = async () => {
	return prisma.translate.findMany();
}

export const getTranslateByDiscordId = async (discordId: string) => {
	return prisma.translate.findMany({
		where: { discordId }
	});
}

export const getTranslatesByUserId = async (userId: string) => {
	return prisma.translate.findMany({
		where: { user: { id: userId } }
	});
}

export const getLanguageTranslateByUserId = async (userId: string) => {
	return prisma.translate.groupBy({
		by: ['language'],
		where: {
			user: { id: userId }
		},
		_count: {
			language: true,
		},
	});
}