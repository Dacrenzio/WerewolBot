exports.sendEmbed = function (color, description, destinatario) {
  const Discord = require("discord.js");
  embed = new Discord.MessageEmbed();
  embed.setDescription(description);
  embed.setColor(color);
  destinatario.send({ embeds: [embed] });
};
