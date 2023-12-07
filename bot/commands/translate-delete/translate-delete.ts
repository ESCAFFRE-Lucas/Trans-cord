import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import api, { createEmbed, Option } from '../../common/utils';
import { AxiosResponse } from 'axios';
import { Translation } from '../../models';

const translateDeleteCommand =
	new SlashCommandBuilder()
		.setName('translate-delete')
		.setDescription('Delete a translation')
		.addStringOption(option =>
			option
				.setName('id')
				.setDescription('Translation id')
				.setRequired(true)
		)
		.toJSON();


const translateDeleteAction = async (interaction: ChatInputCommandInteraction) => {
	const translateId = interaction.options.getString(Option.ID)!;

	try {
		await interaction.deferReply();
		const response = await api.delete<AxiosResponse<Translation>>(`/translate/${translateId}`);

		const { id } = response.data.data;

		const embed = createEmbed({
			title: 'Translation Delete',
			fields: [{
				name: 'Translation deleted',
				value: `You have successfully deleted your translation (${id})`,
			}],
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
			title: 'Translation Delete',
			fields: [{
				name: 'Cannot find translation',
				value: 'Please check your id',
			}],
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

		await interaction.followUp({ embeds: [embed] });
	}
};

export default {
	translateDeleteAction,
	translateDeleteCommand
};