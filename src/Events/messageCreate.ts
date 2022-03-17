import { Message, MessageEmbed } from "discord.js";
import { client, MessageCommands } from "../index";

import config from '../../config';
import { parseTip } from "tip.cc-tip-parser";

export default {
    async run (message: Message) {
        if (message.author.id === "617037497574359050" && message.content.includes('sent')&& !message.content.includes("\n")) {
            const tip = parseTip(message.content);
            if (!tip.valid) return;
            if (tip.receiver !== client.user?.id) return;
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setTitle(`💰 Faucet`)
                        .setDescription(`${message.author.toString()} you have successfully added **${tip.value.toFixed(8)} ${tip.currency}** to the faucet.`)
                        .setColor('BLUE')
                        .setThumbnail((client.users.cache.find(u => u.id === tip.sender) ?? await client.users.fetch(tip.sender))?.displayAvatarURL() ?? "")
                ]
            })
        }

        if (!message.guild || (message.author.bot && !config.allowlisted_bots.includes(message.author.id))) return;

        if (!message.content.startsWith(config.prefix)) return;

        const command: any = MessageCommands.get(message.content.slice(config.prefix.length).split(/\s/g)[0]);

        if (typeof command !== "undefined") command.default.run(message, message.content.slice(config.prefix.length).split(/\s/g).slice(1));
    }
}