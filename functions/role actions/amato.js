module.exports = {
  description: "gives the Amato trait to someone that is advised",
  execute(message, moderatore) {
    const embed = require("../sendEmbed.js");

    let target = message.mentions.members.first();

    moderatore.getRole(target).pushTrait("amato");
    moderatore.getRole(target).pushTrait(message.meber);

    embed.sendEmbed([149, 193, 255], "Sei l'amato.", target);
    embed.sendEmbed(
      [0, 255, 0],
      `${target.toString()} è stato avvisato`,
      message.channel
    );
  },
};
