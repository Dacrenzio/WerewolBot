const embed = require("../functions/sendEmbed.js");
const f = require("../figures.js");
const err = require("../functions/errors");

module.exports = {
  name: "kill",
  description: "this command let the wolf kill a player",
  execute(message, args, moderatore) {
    //get the mentions
    let mentionedArray = message.mentions.members.values();

    //check errors
    if (err.errors([0, 1, 7, 8], moderatore, message)) return;

    if (message.channel.name.valueOf() != "chat-segreta") {
      message.delete();
      embed.sendEmbed(
        [255, 0, 0],
        "Non sei nel canale segreto",
        message.author
      );
      return;
    }

    if (moderatore.getRole(message.member).hasTrait("usato")) {
      embed.sendEmbed(
        [255, 0, 0],
        "Avete già ucciso qualcuno stanotte.",
        message.channel
      );
      return;
    }

    if (giovaneErr(moderatore, message, mentionedArray)) return;
    if (err.errors([3], moderatore, message)) return;

    let caller = moderatore.getRole(message.member);

    //check if he's roleID: 2 or 8 and alive
    if (
      !(caller.id === f.capoBranco || caller.id === f.lupoDelBranco) &&
      caller.alive
    ) {
      message.delete();
      embed.sendEmbed(
        [255, 0, 0],
        "Non hai il ruolo adatto per sbranare vite.",
        message.author
      );
      return;
    }
    //stop check errors

    for (let mentioned in mentionedArray) {
      let target = moderatore.getRole(mentioned);

      //check if they're killing someone dead
      if (!target.alive) {
        embed.sendEmbed(
          [255, 0, 0],
          `${mentioned.toString()} è già morto!`,
          message.channel
        );
        return;
      }

      //turn the discendente into wolf
      if (target.hasTrait("discendente")) {
        discendente(target, message);
        continue;
      }

      //contact the traditore
      if (target.id === f.traditore) {
        traditore(moderatore, target);
        continue;
      }

      //check if the objective is protetto or the wolf is pazzo
      if (target.hasTrait("protetto") || caller.hasTrait("pazzo")) {
        if (caller.hasTrait("pazzo")) {
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
        continue;
      }

      embed.sendEmbed(
        [149, 193, 255],
        `${mentioned.toString()} sarà ucciso di mattina`,
        message.channel
      );

      //checking the amato
      let eaten = amato(moderatore, target, mentioned, embed);

      //remembering who killed the hero
      if (moderatore.getRole(eaten).hasTrait("eroe")) {
        let indexEroe = moderatore.getRole(eaten).tratto.indexOf("eroe");
        moderatore
          .getRole(eaten)
          .tratto.splice(indexEroe + 1, 0, message.member);
      }

      //killing the player
      moderatore.getRole(eaten).tratto.push("mangiato");
      moderatore.playerDying.push(eaten);
    }

    //metto ai lupi il tratto 'usato' per la notte
    for (let wolves of moderatore.playerList.values()) {
      if (wolves.id === f.capoBranco || wolves.id === f.lupoDelBranco) {
        wolves.tratto.push("usato");
      }
    }
  },
};

function giovaneErr(moderatore, message, mentionedArray) {
  let youngWolfBurned = false;
  //check if the burned is the young wolf
  if (
    moderatore.burnedPlayer !== null &&
    moderatore.getRole(moderatore.burnedPlayer).id === f.giovaneLupo
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

function amato(moderatore, target, mentioned) {
  let angelo = target.tratto[target.tratto.indexOf("amato") + 1];
  if (target.hasTrait("amato") && moderatore.getRole(angelo).alive) {
    embed.sendEmbed([149, 193, 255], "Il tuo amato è in pericolo.", angelo);
    return angelo;
  } else {
    return mentioned;
  }
}

async function discendente(playerRole, message) {
  //removing the discendente trait
  playerRole.removeTrait("discendente");
  embed.sendEmbed(
    [149, 193, 255],
    `${playerRole.player.toString()} era un discendente dei lupi, dategli il benvenuto!`,
    message.channel
  );

  //turning him in a wolf pack
  playerRole.fazione = "lupi";
  playerRole.aura = true;
  playerRole.pushTrait("ombra");
  playerRole.id = 8;

  //giving to the new wolf the secret role
  await message.guild.members.fetch();
  let secretRole = message.guild.roles.cache.find((r) => r.name === "Secret");
  mentioned.roles.add(secretRole);
  await message.guild.members.fetch();

  //writing in private the wolves
  lupi = "";
  for (let value of moderatore.playerList.values()) {
    if (value.id === 2) {
      lupi += `${value.player.toString()} è il Capo Branco\n`;
    } else if (value.id === 8) {
      lupi += `${value.player.toString()} è un Lupo del Branco\n`;
    } else if (value.id === 5) {
      lupi += `${value.player.toString()} è il Giovane Lupo\n`;
    } else if (value.id === 17) {
      lupi += `${value.player.toString()} è il Traditore\n`;
    }
  }
  embed.sendEmbed(
    [149, 193, 255],
    "Eri un discendente dei lupi, ecco i tuoi nuovi compagni:\n\n" + lupi,
    playerRole.player
  );
}

function traditore(moderatore, playerRole, message) {
  embed.sendEmbed(
    [149, 193, 255],
    `${playerRole.player.toString()} sarà avvisato della vostra presenza`,
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
  embed.sendEmbed([149, 193, 255], lupi, playerRole.player);
}
