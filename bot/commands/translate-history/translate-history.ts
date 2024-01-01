import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import api, { createEmbed } from '../../common/utils';
import { Translate } from '../../models';

const translateHistoryCommand =
	new SlashCommandBuilder()
		.setName('translate-history')
		.setDescription('Get the translation history')
		.toJSON();

const translateHistoryAction = async (interaction: ChatInputCommandInteraction) => {
	const { id: discordId } = interaction.user;

	try {
		await interaction.deferReply();

		const response = await api.get<AxiosResponse<Translate[]>>(`/translate/${discordId}`);

		const fields = response.data.data.map((item) => {
			return {
				name: `You translated "${item.text}" to "${item.translationText}" with "${item.language}" language at ${moment(item.createdAt).format('DD/MM/YYYY')}`,
				value: `The id of this translation is : "${item.id}"`
			};
		});

		const embed = createEmbed({
			title: 'Translation History',
			fields: fields.length === 0 ? [{
				name: 'No translation found',
				value: 'You have not translated anything yet'
			}] : fields,
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

		await interaction.editReply({ embeds: [embed]});
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
	translateHistoryAction,
	translateHistoryCommand
};