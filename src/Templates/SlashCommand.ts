import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Message } from "discord.js";

import config from '../../config';
import { client } from '../index';

export default {
    builder: (
        new SlashCommandBuilder()
            .setName(`command_name`)
            .setDescription(`Command Description`)
    ).toJSON(),
    async run (interaction: CommandInteraction) {
        // Code goes here
    }
}