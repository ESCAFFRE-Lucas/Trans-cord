import { Client, Events, IntentsBitField } from 'discord.js';
import dotenv from 'dotenv';
import { Command } from './command';
import Translate from '../commands/translate/translate';

dotenv.config();

export const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

client.on(Events.ClientReady, (e) => {
	console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === Command.TRANSLATE) {
		Translate.translateAction(interaction);
	}
});

client.login(process.env.DISCORD_TOKEN);