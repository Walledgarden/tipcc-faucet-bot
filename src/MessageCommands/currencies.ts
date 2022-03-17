import { Message, MessageEmbed } from "discord.js";

import config from '../../config';

export default {
    async run (message: Message, args: Array<any>) {
        return message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`💰 Supported Faucet Currencies`)
                    .setDescription(config.faucet_currencies.length > 0 ? config.faucet_currencies.map(r => `**${r.name}**`).join(', ') : 'No supported currencies found.')
                    .setColor(config.faucet_currencies.length > 0 ? 'BLUE' : 'DARK_RED')
            ]
        })
    }
}