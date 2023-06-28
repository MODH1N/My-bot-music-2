const discord = require("discord.js");
const ms = require("ms");
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports.run = async (client, player, track) => {
    let button8 = new MessageButton()
        .setLabel(`ㅤ`)
        .setCustomId(`dstop`)
        .setDisabled(true)
        .setStyle("SECONDARY");

    let rowss = new MessageActionRow()
        .addComponents(button8);

    const durationSeconds = Math.floor(track.info.length / 1000);
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.floor((durationSeconds % 3600) / 60);
    const seconds = durationSeconds % 60;
    let durationText = '';

    if (hours > 0) {
        durationText += `${hours} ชั่วโมง `;
    }

    if (minutes > 0) {
        durationText += `${minutes} นาที `;
    }

    durationText += `${seconds} วินาที`;

    const embed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('**อยู่ในระว่างเล่นเพลง**')
        .setThumbnail(track.info.image)
        .setTimestamp()
        .setDescription(`**เพลง:** [${track.info.title}](${track.info.uri}) \n\n **ระยะเวลาของเพลง:** ${durationText}   \n\n **สถานะ :** **กำลังเล่น**\n\n **บอทยังไม่สมบูรณ์น้าา ขออภัยด้วยงับ** \n *จาก Dev *`)
        .setFooter(`Author: ${track.info.author}
ID: ${player.textChannel.guild.me.id}`);

    const embed3 = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('**เพลงจบลงแล้ว**')
        .setThumbnail(track.info.image)
        .setTimestamp()
        .setDescription(`**เพลง:** [${track.info.title}](${track.info.uri}) \n\n **ระยะเวลาของเพลง:** ${durationText}   \n\n **สถานะ :** **จบลง** `)
        .setFooter(`Author: ${track.info.author} 
ID: ${player.textChannel.guild.me.id}`);

    const MESSAGE = await player.textChannel.send({ embeds: [embed], components: [rowss] });

    const ttt = track.info.length;

    const filter = i => i.guild.me.voice.channel == i.member.voice.channel;

    const collector = MESSAGE.createMessageComponentCollector({ filter, time: ttt });

    collector.on('collect', async i => {
        const embed5 = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('**อยู่ในระว่างเล่นเพลง**')
            .setThumbnail(track.info.image)
            .setTimestamp()
            .setDescription(`**Title:** [${track.info.title}](${track.info.uri}) \n\n **ระยะเวลาของเพลง :** ${ms(track.info.length)}   \n\n **สถานะ :** ข้ามเพลงโดย <@${i.user.id}> `)
            .setFooter(`Author: ${track.info.author}`);

        if (i.customId === 'skip') {
            await i.deferUpdate();
            player.stop();
            await i.editReply({ embeds: [embed5], components: [rowss] });
        }
    });

    collector.on('end', async () => {
        await MESSAGE.edit({ embeds: [embed3], components: [rowss] });
    });
};
