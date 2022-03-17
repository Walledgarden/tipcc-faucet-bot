"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = require("../../config");
const index_1 = require("../index");
exports.default = {
    async run(message, args) {
        const description = [
            '**How does the faucet bot work?**',
            'This faucet bot allows you to claim a decent amount of crypto for free!',
            '',
            '**Commands**',
            `\`${config_1.default.prefix}faucet <currency>\``,
            `Collect a currency from the faucet.`,
            '',
            `\`${config_1.default.prefix}currencies\``,
            `View the list of supported currencies.`
        ];
        if (config_1.default.owners.includes(message.author.id)) {
            description.concat([
                ``,
                `\`${config_1.default.prefix}say <text>\``,
                `Make the bot repeat what you say.`
            ]);
        }
        return message.reply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle(`💰 Faucet Bot Help`)
                    .setThumbnail(index_1.client.user?.displayAvatarURL() ?? "")
                    .setDescription(description.join("\n"))
                    .setFooter({ text: `Written with love by Walledgarden#0001` })
                    .setColor('BLUE')
            ]
        });
    }
};
