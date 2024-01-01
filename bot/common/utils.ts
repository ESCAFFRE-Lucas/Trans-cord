import { ColorResolvable, APIEmbedField, EmbedAuthorOptions, EmbedBuilder, EmbedFooterOptions, RestOrArray } from 'discord.js';
import axios from 'axios';

export enum Command {
	TRANSLATE = 'translate',
	TRANSLATE_HISTORY = 'translate-history',
	TRANSLATE_DELETE = 'translate-delete',
	TRANSLATE_LANG = 'translate-lang',
}


// Create an instance of Axios with a base URL and other configuration options
const api = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Content-Type': 'application/json',
		'x-discord-signature': process.env.API_ACCESS_TOKEN
	},
});

export default api;

export enum Option {
	LANG = 'lang',
	TEXT = 'text',
	ID = 'id',
}

type Embed<T> = {
	title: string | null,
	color?: ColorResolvable | null,
	fields: RestOrArray<T>,
	author: EmbedAuthorOptions | null,
	footer: EmbedFooterOptions | null,
}

export const createEmbed = <T extends APIEmbedField>(embed: Embed<T>) => {
	return new EmbedBuilder()
		.setTitle(embed.title)
		.setAuthor(embed.author)
		.addFields(...embed.fields)
		.setTimestamp()
		.setFooter(embed.footer)
		.setColor(embed?.color ?? null);
};