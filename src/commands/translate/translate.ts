import { Interaction, SlashCommandBuilder } from 'discord.js';
import { options } from './options.json';

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


const translateAction = (interaction: Interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const textToTranslate = interaction.options.getString('text') ?? "Hello everyone!";
	const langToTranslate = interaction.options.getString('lang') ?? "FR";


};

export default {
	translateCommand,
	translateAction
};