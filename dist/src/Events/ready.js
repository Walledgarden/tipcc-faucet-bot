"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
exports.default = {
    async run() {
        console.log([
            `Ready as ${index_1.client.user?.tag}`,
            `Loaded ${index_1.MessageCommands.size} Commands`
        ].join("\n"));
    }
};
