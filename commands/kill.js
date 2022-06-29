const embed = require("../functions/sendEmbed.js");
const f = require("../figures.js");
const err = require("../functions/errors");

module.exports = {
  name: "kill",
  description: "this command let the wolf kill a player",
  execute(message, args, moderatore) {
    let mentionedArray = message.mentions.members.values();

    //check errors
    if (err.errors([0, 1, 7, 8], moderatore, message)) return;

    if (moderatore.playerList.get(message.member).tratto.includes("usato")) {
      embed.sendEmbed(
        [255, 0, 0],
        "Avete già ucciso qualcuno stanotte.",
        message.channel
      );
      return;
    }

    if (giovaneErr(moderatore, message, mentionedArray)) return;
    if (err.errors([3], moderatore, message)) return;
    //stop check errors

    let caller = moderatore.playerList.get(message.member);

    if (
      (caller.id === f.capoBranco || caller.id === f.lupoDelBranco) &&
      caller.alive
    ) {
      //check if he's roleID: 2 or 8

      for (var i = 0; i < mentionedArray.length; i += 1) {
        let mentioned = mentionedArray[i];
        let called = moderatore.playerList.get(mentioned);

        //check if they're killing someone dead
        if (!called.alive) {
          embed.sendEmbed(
            [255, 0, 0],
            `${mentioned.toString()} è già morto!`,
            message.channel
          );
          return;
        }

        //turn the discendente into wolf
        if (called.tratto.includes("discendente")) {
          moderatore = discendente(moderatore, mentioned, embed, message);
          continue;
        }

        //contact the traditore
        if (called.id === f.traditore) {
          traditore(moderatore, embed, mentioned, message);
          continue;
        }

        //check if the objective is protetto or the wolf is pazzo
        if (
          called.tratto.includes("protetto") ||
          caller.tratto.includes("pazzo")
        ) {
          if (caller.tratto.includes("pazzo")) {
            embed.sendEmbed(
              [149, 193, 255],
              `${mentioned.toString()} sarà ucciso di mattina`,
              message.channel
            );
          } else {
            embed.sendEmbed(
              [149, 193, 255],
              `${mentioned.toString()} non può essere ucciso.`,
              message.channel
            );
          }
        } else {
          embed.sendEmbed(
            [149, 193, 255],
            `${mentioned.toString()} sarà ucciso di mattina`,
            message.channel
          );

          //checking the amato
          let eaten = amato(moderatore, called, mentioned, embed);

          //remembering who killed the hero
          if (called.tratto.includes("eroe")) {
            let indexEroe = called.tratto.indexOf("eroe");
            moderatore.playerList
              .get(mentioned)
              .tratto.splice(indexEroe + 1, 0, message.member);
          }

          //killing the player
          moderatore.playerList.get(eaten).tratto.push("mangiato");
          moderatore.playerDying.push(eaten);
        }
      }

      //metto ai lupi il tratto 'usato' per la notte
      for (let wolves of moderatore.playerList.entries()) {
        if (wolves[1].id === f.capoBranco || wolves[1].id === f.lupoDelBranco) {
          moderatore.playerList.get(wolves[0]).tratto.push("usato");
        }
      }
    } else {
      message.delete();
      embed.sendEmbed(
        [255, 0, 0],
        "Non hai il ruolo adatto per sbranare vite.",
        message.author
      );
    }
  },
};

function giovaneErr(moderatore, message, mentionedArray) {
  let youngWolfBurned = false;
  //check if the burned is the young wolf
  if (
    moderatore.burnedPlayer !== null &&
    moderatore.playerList.get(moderatore.burnedPlayer).id === f.giovaneLupo
  ) {
    youngWolfBurned = true;
  }

  if (mentionedArray.length !== 1 && !youngWolfBurned) {
    //if they call more or less then 1 people when the young wolf is not burned
    embed.sendEmbed(
      [255, 0, 0],
      "Citare una persona da uccidere",
      message.channel
    );
    return true;
  } else if (mentionedArray.length !== 2 && youngWolfBurned) {
    //if the call more or less then 2 people when the young wolf is burned
    embed.sendEmbed(
      [255, 0, 0],
      "Citare due persone da uccidere",
      message.channel
    );
    return true;
  }
  return false;
}

function amato(moderatore, called, mentioned, embed) {
  let angelo = called.tratto[called.tratto.indexOf("amato") + 1];
  if (
    called.tratto.includes("amato") &&
    moderatore.playerList.get(angelo).alive
  ) {
    embed.sendEmbed([149, 193, 255], "Il tuo amato è in pericolo.", angelo);
    return angelo;
  } else {
    return mentioned;
  }
}

function discendente(moderatore, mentioned, embed, message) {
  //removing the discendente trait
  moderatore.playerList
    .get(mentioned)
    .tratto.splice(called.tratto.indexOf("discendente"), 1);
  embed.sendEmbed(
    [149, 193, 255],
    `${mentioned.toString()} era un discendente dei lupi, dategli il benvenuto!`,
    message.channel
  );

  //turning him in a wolf pack
  moderatore.playerList.get(mentioned).fazione = "lupi";
  moderatore.playerList.get(mentioned).aura = true;
  moderatore.playerList.get(mentioned).tratto.push("ombra");
  moderatore.playerList.get(mentioned).id = 8;

  //giving to the new wolf the secret role
  let secretRole = message.guild.roles.cache.find((r) => r.name === "Secret");
  mentioned.roles.add(secretRole);

  //writing in private the wolves
  lupi = "";
  for (let wolves of moderatore.playerList.entries()) {
    if (wolves[1].id === 2) {
      lupi += `${wolves[0].toString()} è il Capo Branco\n`;
    } else if (wolves[1].id === 8) {
      lupi += `${wolves[0].toString()} è un Lupo del Branco\n`;
    } else if (wolves[1].id === 5) {
      lupi += `${wolves[0].toString()} è il Giovane Lupo\n`;
    } else if (wolves[1].id === 17) {
      lupi += `${wolves[0].toString()} è il Traditore\n`;
    }
  }
  embed.sendEmbed(
    [149, 193, 255],
    "Eri un discendente dei lupi, ecco i tuoi nuovi compagni:\n\n" + lupi,
    mentioned
  );

  return moderatore;
}

function traditore(moderatore, embed, mentioned, message) {
  embed.sendEmbed(
    [149, 193, 255],
    `${mentioned.toString()} sarà avvisato della vostra presenza`,
    message.channel
  );
  let lupi = "";
  for (let player of moderatore.playerList.entries()) {
    if (
      player[1].id === f.capoBranco ||
      player[1].id === f.giovaneLupo ||
      player[1].id === f.lupoDelBranco
    )
      lupi += `${player[0].toString()} è un lupo.\n`;
  }
  embed.sendEmbed([149, 193, 255], lupi, mentioned);
}
