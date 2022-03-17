import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Message, MessageEmbed } from "discord.js";

import config from '../../config';
import { client, SlashCommands } from '../index';

export default {
    builder: (
        new SlashCommandBuilder()
            .setName(`help`)
            .setDescription(`Get help about the bot commands`)
    ).toJSON(),
    async run (interaction: CommandInteraction) {
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setAuthor({ name: `${interaction.guild?.name} Help Menu`, iconURL: interaction.guild?.iconURL({ dynamic: true }) ?? "" })
            .setThumbnail(this.client.user.displayAvatarURL())
            .setDescription([
                `These are the available commands for ${interaction.guild?.name}`,
                `The bot's prefix is: /`,
                `Command Parameters: \`<>\` is strict & \`[]\` is optional`
            ].join("\n"))
            .addField(`Commands`, SlashCommands.map((r: any) => `\`${r.builder.name}\``).join(", "))
            .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        return interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
}