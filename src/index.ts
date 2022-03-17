import * as fs from 'fs';
import * as path from 'path';
import { Client, Collection, Intents } from 'discord.js';

import config from '../config';

export const client: Client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], allowedMentions: { repliedUser: false } });

export const MessageCommands = new Collection();

for (const file of (fs.readdirSync(path.resolve(__dirname, './MessageCommands')).filter(f => (/(.ts|.js)$/).test(f)))) {
    const command = require(`./MessageCommands/${file}`);
    MessageCommands.set(file.match(/(.+)(.ts|.js)/)?.slice(1, -1).join(""), command);
}

for (const file of (fs.readdirSync(path.resolve(__dirname, './Events')).filter(f => (/(.ts|.js)$/).test(f)))) {
    const event = require(`./Events/${file}`);
    client.on((file.match(/(.+)(.ts|.js)/)?.slice(1, -1) ?? []).join(""), event.default.run)
}

client.login(config.token);
