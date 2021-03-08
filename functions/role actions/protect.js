module.exports = {
  description: "this command allows the witch to protect 1 player",
  execute(message, moderatore) {
    const embed = require("../sendEmbed.js");
    const f = require("../../figures.js");

    if (message.mentions.members.first() === message.member) {
      embed.sendEmbed(
        [255, 0, 0],
        "Non puoi proteggere te stessa!",
        message.channel
      );
      return;
    }

    let mentioned = message.mentions.members.first();
    let caller = moderatore.playerList.get(message.member);
    let called = moderatore.playerList.get(mentioned);

    if (caller.alive) {
      //check if he's roleID: 18

      if (!called.alive) {
        embed.sendEmbed(
          [255, 0, 0],
          "Hai protetto un giocatore morto!",
          message.channel
        );
        return;
      }

      moderatore.playerList.get(mentioned).tratto.push("protetto");
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
