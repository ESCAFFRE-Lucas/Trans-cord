import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { options } from '../../common/options.json';
import api, { createEmbed, Option } from '../../common/utils';
import { AxiosResponse } from 'axios';
import { Translation } from '../../models';

const translateCommand =
	new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Translate an entire text')
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

	try {
		await interaction.deferReply();

		const response = await api.post<AxiosResponse<Translation>>('/translate', {
			text: textToTranslate,
			language: langToTranslate,
			discordId: interaction.user.id
		});
		const { translationText } = response.data.data;

		const embed = createEmbed({
			title: 'Translation Result',
			fields: [
				{ name: 'Text to translate', value: textToTranslate },
				{ name: 'Translated text', value: translationText, inline: true },
			],
			color: '#00ff00',
			author: {
				name: 'Trans cord Bot',
				iconURL: 'https://cdn.discordapp.com/avatars/1174654264472256542/d28ac4ae4874545938d6ed4912984dd3.png'
			},
			footer: {
				text: 'Here is your traduction history !',
				iconURL: 'https://cdn.discordapp.com/avatars/1174654264472256542/d28ac4ae4874545938d6ed4912984dd3.png'
			}
		});

		await interaction.editReply({ embeds: [embed] });
	} catch (error) {
		console.debug(error);

		const embed = createEmbed({
			title: 'Translation Result',
			fields: [
				{
					name: 'Translated text',
					value: 'An error occurred during the translation (please retry later while we fix it)',
					inline: true
				},
			],
			color: '#ff0000',
			author: {
				name: 'Trans cord Bot',
				iconURL: 'https://cdn.discordapp.com/avatars/1174654264472256542/d28ac4ae4874545938d6ed4912984dd3.png'
			},
			footer: {
				text: 'Here is your traduction history !',
				iconURL: 'https://cdn.discordapp.com/avatars/1174654264472256542/d28ac4ae4874545938d6ed4912984dd3.png'
			}
		});

		await interaction.followUp({ embeds: [embed] });
	}
};

export default {
	translateCommand,
	translateAction
};