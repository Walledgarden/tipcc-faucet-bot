import { Message } from "discord.js";
import { MessageCommands } from "../index";

import config from '../../config';

const array_sum = (array: Array<number>) => array.reduce((partialSum, a) => partialSum + a, 0);

export default {
    async run (message: Message) {
        if (!message.guild || (message.author.bot && !config.allowlisted_bots.includes(message.author.id))) return;

        if (!message.content.startsWith(config.prefix)) return;

        const command: any = MessageCommands.get(message.content.slice(config.prefix.length).split(/\s/g)[0]);

        if (typeof command !== "undefined") command.default.run(message, message.content.slice(config.prefix.length).split(/\s/g).slice(1));
    }
}