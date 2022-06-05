import { Message, MessageEmbed } from 'discord.js';

import config from '../../config';
import { client } from '../index';

export default {
  async run(message: Message, args: Array<any>) {
    const description = [
      '**How does the faucet bot work?**',
      'This faucet bot allows you to claim a decent amount of crypto for free!',
      '',
      '**Commands**',
      `\`${config.prefix}faucet <currency>\``,
      'Collect a currency from the faucet.',
      '',
      `\`${config.prefix}currencies\``,
      'View the list of supported currencies.',
    ];

    if (config.owners.includes(message.author.id)) {
      description.concat([
        '',
        `\`${config.prefix}say <text>\``,
        'Make the bot repeat what you say.',
      ]);
    }

    return message.reply({
      embeds: [
        new MessageEmbed()
          .setTitle('💰 Faucet Bot Help')
          .setThumbnail(client.user?.displayAvatarURL() ?? '')
          .setDescription(description.join('\n'))
          .setFooter({ text: 'Written with love by Walledgarden#0001' })
          .setColor('BLUE'),
      ],
    });
  },
};