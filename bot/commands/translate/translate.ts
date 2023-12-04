import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { options } from './options.json';
import { Option } from '../../common/utils';

const translateCommand =
	new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Translate a text')
		.addStringOption(option =>
			option
				.setName('text')
				.setDescription('Text to translate')
				.setRequired(true)
		)
		.addStringOption(option =>
			option
				.setName('lang')
				.setDescription('Lang to translate')
				.setRequired(true)
				.addChoices(
					// Sort the array based on some criteria (e.g., alphabetically by language name)
					...options.sort((a, b) => a.value.localeCompare(b.value))
				)
		)
		.toJSON();


const translateAction = async (interaction: ChatInputCommandInteraction) => {
	const textToTranslate = interaction.options.getString(Option.TEXT) ?? 'Hello everyone!';
	const langToTranslate = interaction.options.getString(Option.LANG) ?? 'FR';

	console.log(`Translating "${textToTranslate}" to ${langToTranslate}`);

	await interaction.reply("ez");
};

export default {
	translateCommand,
	translateAction
};