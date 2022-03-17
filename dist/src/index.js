"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCommands = exports.client = void 0;
const fs = require("fs");
const path = require("path");
const discord_js_1 = require("discord.js");
const config_1 = require("../config");
exports.client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES], allowedMentions: { repliedUser: false } });
exports.MessageCommands = new discord_js_1.Collection();
for (const file of (fs.readdirSync(path.resolve(__dirname, './MessageCommands')).filter(f => (/(.ts|.js)$/).test(f)))) {
    const command = require(`./MessageCommands/${file}`);
    exports.MessageCommands.set(file.match(/(.+)(.ts|.js)/)?.slice(1, -1).join(""), command);
}
for (const file of (fs.readdirSync(path.resolve(__dirname, './Events')).filter(f => (/(.ts|.js)$/).test(f)))) {
    const event = require(`./Events/${file}`);
    exports.client.on((file.match(/(.+)(.ts|.js)/)?.slice(1, -1) ?? []).join(""), event.default.run);
}
exports.client.login(config_1.default.token);
