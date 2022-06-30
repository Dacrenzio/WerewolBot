module.exports = {
  description: "says if the mentioned player is a mistic",
  execute(message, moderatore) {
    const embed = require("../sendEmbed.js");

    let mentioned = message.mentions.members.first();
    let mentionedRole = moderatore.getRole(mentioned);
    let callerRole = moderatore.getRole(message.member);

    if (callerRole.alive) {
      //check if he's roleID: 9 and alive

      if (mentionedRole.misticismo) {
        embed.sendEmbed(
          [149, 193, 255],
          `${mentioned.toString()} è un mistico`,
          message.channel
        );
      } else {
        embed.sendEmbed(
          [149, 193, 255],
          `${mentioned.toString()} non è un mistico`,
          message.channel
        );
      }
    } else {
      embed.sendEmbed([255, 0, 0], "Sei morto.", message.channel);
    }
  },
};
