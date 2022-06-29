module.exports = {
  description: "this command allows the witch to protect 1 player",
  execute(message, moderatore) {
    const embed = require("../sendEmbed.js");

    if (message.mentions.members.first() === message.member) {
      embed.sendEmbed(
        [255, 0, 0],
        "Non puoi proteggere te stessa!",
        message.channel
      );
      return;
    }

    let mentioned = message.mentions.members.first();
    let caller = moderatore.getRole(message.member);
    let target = moderatore.getRole(mentioned);

    if (caller.alive) {
      if (!target.alive) {
        embed.sendEmbed(
          [255, 0, 0],
          "Hai protetto un giocatore morto!",
          message.channel
        );
        return;
      }

      moderatore.getRole(mentioned).pushTrait("protetto");
      embed.sendEmbed(
        [149, 193, 255],
        `${mentioned.toString()} sarà protetto stanotte.`,
        message.channel
      );
      return;
    } else {
      embed.sendEmbed([255, 0, 0], "Sei morto.", message.channel);
    }
  },
};
