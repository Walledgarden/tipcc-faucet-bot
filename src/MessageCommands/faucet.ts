import { Message, MessageEmbed } from "discord.js";

import config from '../../config';
import { FaucetDatabase } from "../Core/db";

const genRand = (min: number, max: number, decimalPlaces: number): number => {  
    var rand = Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);  // could be min or max or anything in between
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand*power) / power;
}

export default {
    async run (message: Message, args: Array<any>) {
        if (!args[0]) return message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`🚫 Command error`)
                    .setDescription(`${message.author.toString()} you need to specify a currency to faucet.`)
                    .addField(`Example`, `${config.prefix}faucet ${config.faucet_currencies[0]?.name}`)
                    .setColor('DARK_RED')
            ]
        });

        if (!config.faucet_currencies.some(c => c.name.toLowerCase() === args[0].toLowerCase())) return message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`🚫 Command error`)
                    .setDescription(`${message.author.toString()} the currency ${args[0]} is not support.`)
                    .setFooter({ text: `Hint: Check supported currencies with ${config.prefix}currencies` })
                    .setColor('DARK_RED')
            ]
        });

        const db = new FaucetDatabase();

        if (db.onFaucetTimeout(message.author.id)) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle(`🚫 Command error`)
                        .setDescription(`${message.author.toString()} you are on faucet cooldown. Try again <t:${Math.floor(((db.getUser(message.author.id).last_claim ?? 0) + config.cooldown) / 1000)}:R>.`)
                        .setColor('DARK_RED')
                ]
            });
        }
        
        const currency = config.faucet_currencies.find(c => c.name.toLowerCase() === args[0].toLowerCase());
        const amount = genRand(currency?.min ?? 0, currency?.max ?? 0, currency?.decimals ?? 4);

        db.updateUser(message.author.id, +new Date());

        return message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`💰 Faucet`)
                    .setDescription(`${message.author.toString()} you have successfully fauceted **${!!currency?.usd ? '$' : ''}${amount.toFixed(currency?.decimals ?? 4)} ${currency?.name}**`)
                    .setColor('BLUE')
            ],
            content: `\$tip ${message.author.toString()} ${!!currency?.usd ? '$' : ''}${amount.toFixed(currency?.decimals ?? 4)} ${currency?.name}`
        });
    }
}