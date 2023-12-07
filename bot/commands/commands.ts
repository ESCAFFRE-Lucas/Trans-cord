import { Command } from '../common/utils';
import Translate from './translate/translate';
import TranslateHistory from './translate-history/translate-history';
import TranslateDelete from './translate-delete/translate-delete';
import { ChatInputCommandInteraction } from 'discord.js';
import TranslateLang from './translate-lang/translate-lang';

export const listenForInteraction = async (interaction: ChatInputCommandInteraction) => {

	switch (interaction.commandName) {
		case Command.TRANSLATE:
			await Translate.translateAction(interaction);
			break;
		case Command.TRANSLATE_HISTORY:
			await TranslateHistory.translateHistoryAction(interaction);
			break;
		case Command.TRANSLATE_DELETE:
			await TranslateDelete.translateDeleteAction(interaction);
			break;
		case Command.TRANSLATE_LANG:
			await TranslateLang.translateLangAction(interaction);
			break;
	}
};