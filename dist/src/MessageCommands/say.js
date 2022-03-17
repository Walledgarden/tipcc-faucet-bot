"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
exports.default = {
    async run(message, args) {
        if (!config_1.default.owners.includes(message.author.id))
            return;
        if (args.length > 0) {
            return message.channel.send(args.join(" "));
        }
        else {
            return message.channel.send(`Provide something i should say!`);
        }
    }
};
