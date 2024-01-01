import { Client, Events, IntentsBitField } from 'discord.js';
import 'dotenv/config';
import { registerCommands } from './common/register-commands';
import { listenForInteraction } from './commands/commands';

export const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

client.on(Events.ClientReady, () => {
	console.log(`Logged in as ${client.user?.tag}!`);
});

client.on(Events.MessageCreate, async (message) => {
	if (message.content.toLowerCase() === '/translate_this') {
		await message.reply('Hello world!');
	}
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	await listenForInteraction(interaction);
});

client.login(process.env.DISCORD_TOKEN).then(async () => {
	await registerCommands();
});