exports.sendEmbed = function (color, description, destinatario) {
  const { EmbedBuilder } = require('discord.js');
  let embed = new EmbedBuilder();
  embed.setDescription(description);
  embed.setColor(color);
  destinatario.send({ embeds: [embed] });
};
