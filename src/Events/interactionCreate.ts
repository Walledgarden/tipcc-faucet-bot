import { CommandInteraction } from "discord.js";
import { SlashCommands } from "../index";

import config from '../../config';

const array_sum = (array: Array<number>) => array.reduce((partialSum, a) => partialSum + a, 0);

export default {
    async run (interaction: CommandInteraction) {
        if (!interaction.guild || (interaction.user.bot && !config.allowlisted_bots.includes(interaction.user.id))) return;

        const command: any = SlashCommands.get(interaction.commandName);
        
        if (typeof command !== "undefined") command.default.run(interaction);
    }
}