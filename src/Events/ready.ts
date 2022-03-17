import { client, SlashCommands, MessageCommands } from "../index";
import config from "../../config";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/rest/v9";

export default {
    async run() {
        console.log([
            `Ready as ${client.user.tag}`,
            `Loaded ${SlashCommands.size} Slash Commands`,
            `Loaded ${MessageCommands.size} Message Commands`
        ].join("\n"));

        const refresh_slash_commands = async () => {
            try {
                console.log('Started refreshing application (/) commands.');
                const rest = new REST({
                    version: '9'
                }).setToken(config.token);
                await rest.put(
                    Routes.applicationCommands(client.user?.id ?? ""), {
                        body: SlashCommands.map((r: any) => r.default.builder)
                    },
                );
                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        }

        const delete_slash_commands = async () => {
            const rest = new REST({ version: '9' }).setToken(config.token);
            rest.get(Routes.applicationCommands(client.user?.id ?? ''))
                .then((data: any) => {
                    const promises = [];
                    for (const command of data) {
                        const deleteUrl: any = `${Routes.applicationCommands(client.user?.id ?? '')}/${command.id}`;
                        promises.push(rest.delete(deleteUrl));
                    }
                    return Promise.all(promises);
                });
        }
    
        // refresh_slash_commands()
    }
}
