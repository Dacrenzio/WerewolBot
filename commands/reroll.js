module.exports = {
  name: "reroll",
  description: "reroll the random roles and send the list to the moderator",
  async execute(message, moderatore) {
    const embed = require("../functions/sendEmbed.js");
    const err = require("../functions/errors");

    if (err.errors([0, 9], moderatore, message)) return;

    embed.sendEmbed(
      [149, 193, 255],
      "Ritiro a sorte dei ruoli in corso...",
      message.channel
    );

    //resetting players
    moderatore.newGame(
      moderatore.getPlayerNum(),
      moderatore.getRoleListID(),
      message
    );

    moderatore.randomExtraction(message);

    embed.sendEmbed(
      [0, 255, 0],
      "Ruoli riestratti correttamente, scrivere `-night` per inizializzare la notte \n```oppure -reRoll per rieseguire l'estrazione dei ruoli.```",
      message.channel
    );
  },
};
