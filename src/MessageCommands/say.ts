import { Message } from "discord.js";

import config from '../../config';

export default {
    async run (message: Message, args: Array<any>) {
        if (!config.owners.includes(message.author.id)) return;
        if (args.length > 0) {
            return message.channel.send(args.join(" "));
        } else {
            return message.channel.send(`Provide something i should say!`);
        }
    }
}