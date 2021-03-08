module.exports = {
  name: "chooserole",
  description: "this command adds the chosen roles to the game",
  async execute(message, args, moderatore, auto) {
    const embed = require("../functions/sendEmbed.js");
    const random = require("../functions/randomPick.js");
    const assign = require("../functions/assignParameters.js");
    let err = require("../functions/errors");

    if (err.errors([0, 6], moderatore, message)) return;

    if (args.length < moderatore.playerNum - 2) {
      embed.sendEmbed(
        [255, 0, 0],
        "Inseriti troppi pochi ruoli!",
        message.channel
      );
      return;
    }

    if (args.length > moderatore.playerNum * 2 - 2) {
      embed.sendEmbed([255, 0, 0], "Inseriti troppi ruoli!", message.channel);
      return;
    }

    //resetting players
    moderatore.nightNum = 0;
    moderatore.auraType = false;
    moderatore.playerDying = [];
    moderatore.roleListID = [2, 18];
    moderatore.nightOrder = [];
    moderatore.burnedPlayer = null;
    moderatore.numberOfVotes = 0;
    moderatore.ballottaggio = [];
    moderatore.numberOfDeadPlayer = 0;

    await message.guild.members.fetch();
    let ghostRole = message.guild.roles.cache.find((r) => r.name === "Ghost");
    for (i = 0; i < ghostRole.members.array().length; i++) {
      await ghostRole.members.array()[i].roles.remove(ghostRole);
    }
    await message.guild.members.fetch();

    //inserisco i ruoli possibili nella lista
    args.forEach((element) => {
      elem = parseInt(element);
      if (elem >= 1 && elem <= 19 && elem != 2 && elem != 18) {
        moderatore.roleListID.push(elem);
      } else {
        embed.sendEmbed(
          [255, 0, 0],
          "Hai inserito un ID invalido!",
          message.channel
        );
        return;
      }
    });

    embed.sendEmbed(
      [149, 193, 255],
      "Estrazione a sorte dei ruoli in corso...",
      message.channel
    );

    if (random.execute(moderatore, message, auto)) {
      assign.execute(moderatore);
      moderatore.finished = false;
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
