"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = require("../../config");
const db_1 = require("../Core/db");
const genRand = (min, max, decimalPlaces) => {
    var rand = Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min); // could be min or max or anything in between
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand * power) / power;
};
exports.default = {
    async run(message, args) {
        if (!args[0])
            return message.reply({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle(`🚫 Command error`)
                        .setDescription(`${message.author.toString()} you need to specify a currency to faucet.`)
                        .addField(`Example`, `${config_1.default.prefix}faucet ${config_1.default.faucet_currencies[0]?.name}`)
                        .setColor('DARK_RED')
                ]
            });
        if (!config_1.default.faucet_currencies.some(c => c.name.toLowerCase() === args[0].toLowerCase()))
            return message.reply({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle(`🚫 Command error`)
                        .setDescription(`${message.author.toString()} the currency ${args[0]} is not support.`)
                        .setFooter({ text: `Hint: Check supported currencies with ${config_1.default.prefix}currencies` })
                        .setColor('DARK_RED')
                ]
            });
        const db = new db_1.FaucetDatabase();
        if (db.onFaucetTimeout(message.author.id)) {
            return message.reply({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle(`🚫 Command error`)
                        .setDescription(`${message.author.toString()} you are on faucet cooldown. Try again <t:${Math.floor(((db.getUser(message.author.id).last_claim ?? 0) + config_1.default.cooldown) / 1000)}:R>.`)
                        .setColor('DARK_RED')
                ]
            });
        }
        const currency = config_1.default.faucet_currencies.find(c => c.name.toLowerCase() === args[0].toLowerCase());
        const amount = genRand(currency?.min ?? 0, currency?.max ?? 0, currency?.decimals ?? 4);
        db.updateUser(message.author.id, +new Date());
        return message.reply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle(`💰 Faucet`)
                    .setDescription(`${message.author.toString()} you have successfully fauceted **${!!currency?.usd ? '$' : ''}${amount.toFixed(currency?.decimals ?? 4)} ${currency?.name}**`)
                    .setColor('BLUE')
            ],
            content: `\$tip ${message.author.toString()} ${!!currency?.usd ? '$' : ''}${amount.toFixed(currency?.decimals ?? 4)} ${currency?.name}`
        });
    }
};
