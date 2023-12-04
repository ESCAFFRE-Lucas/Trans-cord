import { Client, Events, IntentsBitField } from 'discord.js';
import 'dotenv/config'
import { Command } from './common/utils';
import Translate from './commands/translate/translate';

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
client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === Command.TRANSLATE) {
		await Translate.translateAction(interaction);
	}
});

client.login(process.env.DISCORD_TOKEN);