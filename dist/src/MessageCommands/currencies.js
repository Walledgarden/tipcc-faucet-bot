"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = require("../../config");
exports.default = {
    async run(message, args) {
        return message.reply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle(`💰 Supported Faucet Currencies`)
                    .setDescription(config_1.default.faucet_currencies.length > 0 ? config_1.default.faucet_currencies.map(r => `**${r.name}**`).join(', ') : 'No supported currencies found.')
                    .setColor(config_1.default.faucet_currencies.length > 0 ? 'BLUE' : 'DARK_RED')
            ]
        });
    }
};
