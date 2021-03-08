module.exports = {
  async execute(message, channel, moderatore) {
    const fin = require("../functions/victory.js");
    const embed = require("../functions/sendEmbed.js");

    let result = fin.victory(moderatore);
    if (result[0]) {
      let mess = result[1];
      if (result[2]) {
        mess += ", il Pazzo";
      }

      if (result[3]) {
        mess += ", il Giullare";
      }

      if (result[4]) {
        mess += ", l'Angelo custode";
      }

      mess +=
        "!!\n\n Fine della partita!!\n Digitare `-newGame n` per iniziare una nuova partita oppure \n`-reRoll` per mantenere gli stessi ruoli e giocatori oppure \n`-chooseRole` per cambiare solo i ruoli.";
      embed.sendEmbed([149, 193, 255], mess, channel);
      moderatore.finished = true;

      await message.guild.members.fetch();
      let ghostRole = message.guild.roles.cache.find((r) => r.name === "Ghost");
      let modRole = message.guild.roles.cache.find(
        (r) => r.name === "Moderatore"
      );
      for (i = 0; i < ghostRole.members.array().length; i++) {
        await ghostRole.members.array()[i].roles.remove(ghostRole);
      }
      for (i = 0; i < modRole.members.array().length; i++) {
        await ghostRole.members.array()[i].roles.remove(modRole);
      }
      await message.guild.members.fetch();
    }
    return result[0];
  },
};
