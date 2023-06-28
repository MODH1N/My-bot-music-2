const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
module.exports = {
  name: "help",
  run: async (client, message, args) => {
    let prefix = client.prefix


    if (!args[0]) {
   
// copyright 2022 @
      
      const embed = new MessageEmbed()
        .setTitle("HELP MENU")
        .setDescription(`
        นี่คือคำสั่งที่ใช้ได้สำหรับบอทตัวนี้
        \`queue\`   : ล้างคิวเพลง
        \`join\`    : เข้าร่วมห้องสนทนาเสียง
        \`jump\`    : ข้ามไปยังเพลงในคิว
        \`loop\`    : ทำให้เพลงเล่นซ้ำ
        \`pause\`   : หยุดเล่นเพลงชั่วคราว
        \`play\`    : เล่นเพลง
        \`queue\`   : แสดงรายชื่อเพลงในคิว
        \`remove\`  : ลบเพลงออกจากคิว
        \`repeat\`  : ทำให้เพลงเล่นวนซ้ำ
        \`seek\`    : ข้ามไปยังส่วนหนึ่งของเพลง
        \`shuffle\` : เรียงลำดับเพลงในคิวแบบสุ่ม
        \`skip\`    : ข้ามเพลง
        \`stop\`    : หยุดเล่นเพลง
        \`volume\`  : เปลี่ยนระดับเสียง
        \`help\`    : แสดงรายการคำสั่งทั้งหมด
        \`ping\`    : แสดงค่าความเร็วในการตอบสนองของบอท
      `)

        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        ).setFooter(`พิมพ์ 1h.help <ชื่อคำสั่ง> เพื่อดูรายละเอียดเกี่ยวกับคำสั่ง! \n     
       Dev HIN`)
        .setTimestamp()
        .setColor("WHITE");
      return message.reply({ embeds: [embed] });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)

          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Help Command: " + args[0])
        .addField("PREFIX:", `\`!\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`?${command.name} ${command.usage}\``
            : `\`?${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor("WHITE");
      return message.reply({embeds:[embed]});
    }

  }
}
