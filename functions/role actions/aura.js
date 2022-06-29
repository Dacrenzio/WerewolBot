module.exports = {
  description:
    "this command is used by roleID: 18 Veggente, says to the player if the Aura is dark (true) or white (false)",
  execute(message, moderatore) {
    const embed = require("../sendEmbed.js");
    const f = require("../../figures.js");

    let mentioned = message.mentions.members.first();
    let caller = moderatore.getRole(message.member);
    let target = moderatore.getRole(mentioned);

    if (caller.alive) {
      if (
        (caller.id === f.veggente && !target.alive) ||
        (caller.id === f.medium && target.alive)
      ) {
        //check if the number 18 is checking someone alive and number 10 someone dead
        embed.sendEmbed(
          [255, 0, 0],
          "Hai controllato un giocatore morto (se sei la Veggente) o vivo (se sei la Medium)",
          message.channel
        );
        return;
      }

      if (target.aura) {
        embed.sendEmbed(
          [149, 193, 255],
          `${mentioned.toString()} ha un'aura Oscura`,
          message.channel
        );
        if (caller.id === f.veggente) moderatore.auraType = true;
      } else {
        embed.sendEmbed(
          [149, 193, 255],
          `${mentioned.toString()} ha un'aura Chiara`,
          message.channel
        );
        if (caller.id === f.veggente) moderatore.auraType = false;
      }
      return;
    } else {
      embed.sendEmbed([255, 0, 0], "Sei morto.", message.channel);
    }
  },
};
