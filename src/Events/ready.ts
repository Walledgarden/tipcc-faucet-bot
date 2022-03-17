import { client, MessageCommands } from "../index";

export default {
    async run() {
        console.log([
            `Ready as ${client.user?.tag}`,
            `Loaded ${MessageCommands.size} Commands`
        ].join("\n"));
    }
}