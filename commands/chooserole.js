const embed = require("../functions/sendEmbed.js");
const err = require("../functions/errors");

module.exports = {
  name: "chooserole",
  description: "this command adds the chosen roles to the game",
  async execute(message, moderatore, args) {
    if (err.errors([0, 6], moderatore, message)) return;

    if (args.length < moderatore.getPlayerNum() - 2) {
      embed.sendEmbed(
        [255, 0, 0],
        "Inseriti troppi pochi ruoli!",
        message.channel
      );
      return;
    }

    if (args.length > moderatore.getPlayerNum() * 2 - 2) {
      embed.sendEmbed([255, 0, 0], "Inseriti troppi ruoli!", message.channel);
      return;
    }

    //resetting players while keeping the number of players
    moderatore.newGame(moderatore.getPlayerNum(), message);

    //inserisco i ruoli possibili nella lista
    if (!moderatore.addRoles(args, message)) return;

    embed.sendEmbed(
      [149, 193, 255],
      "Estrazione a sorte dei ruoli in corso...",
      message.channel
    );

    if (moderatore.randomExtraction(message)) {
      embed.sendEmbed(
        [0, 255, 0],
        "Ruoli estratti correttamente, scrivere `-night` per inizializzare la notte ```oppure -reRoll per rieseguire l'estrazione dei ruoli.```",
        message.channel
      );
    } else {
      moderatore.roleListID = [2, 18];
      moderatore.finished = true;
      return;
    }
  },
};
