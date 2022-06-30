module.exports = {
  description: "gives the Amato trait to someone that is advised",
  execute(message, moderatore) {
    const embed = require("../sendEmbed.js");

    let callerMemberRole = moderatore.getRole(message.member);
    let targetMember = message.mentions.members.first();

    moderatore.getRole(targetMember).pushTrait("amato");
    moderatore.getRole(targetMember).pushTrait(callerMemberRole);

    embed.sendEmbed([149, 193, 255], "Sei l'amato.", targetMember);
    embed.sendEmbed(
      [0, 255, 0],
      `${target.toString()} è stato avvisato`,
      message.channel
    );
  },
};
