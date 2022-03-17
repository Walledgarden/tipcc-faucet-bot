"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
const config_1 = require("../../config");
const tip_cc_tip_parser_1 = require("tip.cc-tip-parser");
exports.default = {
    async run(message) {
        if (message.author.id === "617037497574359050" && message.content.includes('sent') && !message.content.includes("\n")) {
            const tip = (0, tip_cc_tip_parser_1.parseTip)(message.content);
            if (!tip.valid)
                return;
            if (tip.receiver !== index_1.client.user?.id)
                return;
            return message.channel.send({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle(`💰 Faucet`)
                        .setDescription(`${message.author.toString()} you have successfully added **${tip.value.toFixed(8)} ${tip.currency}** to the faucet.`)
                        .setColor('BLUE')
                        .setThumbnail((index_1.client.users.cache.find(u => u.id === tip.sender) ?? await index_1.client.users.fetch(tip.sender))?.displayAvatarURL() ?? "")
                ]
            });
        }
        if (!message.guild || (message.author.bot && !config_1.default.allowlisted_bots.includes(message.author.id)))
            return;
        if (!message.content.startsWith(config_1.default.prefix))
            return;
        const command = index_1.MessageCommands.get(message.content.slice(config_1.default.prefix.length).split(/\s/g)[0]);
        if (typeof command !== "undefined")
            command.default.run(message, message.content.slice(config_1.default.prefix.length).split(/\s/g).slice(1));
    }
};
