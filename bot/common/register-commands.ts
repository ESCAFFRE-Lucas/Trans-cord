import dotenv from 'dotenv';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import Translate from '../commands/translate/translate';
import TranslateHistory from '../commands/translate-history/translate-history';
import TranslateDelete from '../commands/translate-delete/translate-delete';
import TranslateLang from '../commands/translate-lang/translate-lang';

dotenv.config();

const commands = [
	Translate.translateCommand,
	TranslateHistory.translateHistoryCommand,
	TranslateDelete.translateDeleteCommand,
	TranslateLang.translateLangCommand
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

export const registerCommands = async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
			{ body: commands }
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error('Error: ', error);
	}
};