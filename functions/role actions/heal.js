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
    let caller = moderatore.playerList.get(message.member);
    let called = moderatore.playerList.get(mentioned);

    if (caller.alive) {
      if (caller.tratto.includes("usato")) {
        embed.sendEmbed(
          [255, 0, 0],
          "Hai già guarito una persona durante la partita",
          message.channel
        );
        return;
      } else {
        let indexPlayer = moderatore.playerDying.indexOf(mentioned);
        if (indexPlayer != -1) {
          if (called.tratto.includes("mangiato")) {
            let indexMangiato = called.tratto.indexOf("mangiato");
            moderatore.playerList
              .get(mentioned)
              .tratto.splice(indexMangiato, 1);

            //removing the killer from the hero
            if (called.tratto.includes("eroe")) {
              let indexEroe = called.tratto.indexOf("eroe");
              moderatore.playerList
                .get(mentioned)
                .tratto.splice(indexEroe + 1, 1);
            }
          }

          moderatore.playerDying.splice(indexPlayer, 1);

          moderatore.playerList.get(message.member).tratto.push("usato");
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
      }
    } else {
      embed.sendEmbed([255, 0, 0], "Sei morto.", message.channel);
    }
  },
};
