module.exports = {
  description: "let the Healer to heal a Dying player",
  execute(message, moderatore) {
    const embed = require("../sendEmbed.js");
    const f = require("../../figures.js");

    if (message.mentions.members.first() === message.member) {
      embed.sendEmbed(
        [255, 0, 0],
        "Non puoi guarire te stessa!",
        message.channel
      );
      return;
    }

    let mentioned = message.mentions.members.first();
    let callerRole = moderatore.getRole(message.member);
    let targetRole = moderatore.getRole(mentioned);

    if (callerRole.alive) {
      if (callerRole.tratto.includes("usato")) {
        embed.sendEmbed(
          [255, 0, 0],
          "Hai già guarito una persona durante la partita",
          message.channel
        );
        return;
      }

      let indexPlayer = moderatore.playerDying.indexOf(targetRole);
      if (indexPlayer != -1) {
        if (targetRole.tratto.includes("mangiato")) {
          //removing traits
          targetRole.removeTrait("mangiato");
          targetRole.getRole(mentioned).removeTrait("eroe");
        }

        moderatore.playerDying.splice(indexPlayer, 1);

        callerRole.pushTrait("usato");
        embed.sendEmbed(
          [149, 193, 255],
          `Hai guarito ${mentioned.toString()}`,
          message.channel
        );
      } else {
        embed.sendEmbed(
          [255, 0, 0],
          "La persona indicata non sta morendo.",
          message.channel
        );
      }
    } else {
      embed.sendEmbed([255, 0, 0], "Sei morto.", message.channel);
    }
  },
};
