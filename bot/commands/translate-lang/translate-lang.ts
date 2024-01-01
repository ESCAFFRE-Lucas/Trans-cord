import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { options } from '../../common/options.json';
import api, { createEmbed, Option } from '../../common/utils';
import { AxiosResponse } from 'axios';
import { Translation } from '../../models';

const translateLangCommand =
	new SlashCommandBuilder()
		.setName('translate-lang')
		.setDescription('Change your preferred lang')
		.addStringOption(option =>
			option
				.setName(Option.LANG)
				.setDescription('Language to translate to')
				.setRequired(true)
				.addChoices(
					// Sort the array based on some criteria (e.g., alphabetically by language name)
					...options.sort((a, b) => a.value.localeCompare(b.value))
				)
		)
		.toJSON();

const translateLangAction = async (interaction: ChatInputCommandInteraction) => {
	const language = interaction.options.getString(Option.LANG)!;

	try {
		await interaction.deferReply();
		const { id: discordId } = interaction.user;

		await api.patch<AxiosResponse<Translation>>('/translate', {
			language,
			discordId
		});

		const embed = createEmbed({
			title: 'Translation Result',
			fields: [
				{ name: 'Successfully change', value: `You just change you preferred lang to ${language}` },
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
	translateLangAction,
	translateLangCommand
};