import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { options } from './options.json';
import { Option } from '../../common/utils';
import axios from 'axios';

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
				.setRequired(false)
				.addChoices(
					// Sort the array based on some criteria (e.g., alphabetically by language name)
					...options.sort((a, b) => a.value.localeCompare(b.value))
				)
		)
		.toJSON();


const translateAction = async (interaction: ChatInputCommandInteraction) => {
	const textToTranslate = interaction.options.getString(Option.TEXT) ?? 'Hello everyone!';
	const langToTranslate = interaction.options.getString(Option.LANG);

	const response = await axios.post(`${process.env.API_URL}/translate`, {
		text: textToTranslate,
		lang: langToTranslate,
		discordId: interaction.user.id
	});

	await interaction.reply(JSON.stringify(response.data));
};

export default {
	translateCommand,
	translateAction
};