const embed = require("../functions/sendEmbed.js");
const { roles } = require("../figures.json");
const err = require("../functions/errors");
const love = require("../functions/amato.js");

module.exports = {
  name: "kill",
  description: "this command let the wolf kill a player",
  execute(message, moderatore) {
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

    let callerRole = moderatore.getRole(message.member);

    //check if he's roleID: 2 or 8 and alive
    if (
      !(callerRole.id === roles.capoBranco || callerRole.id === roles.lupoDelBranco) &&
      callerRole.alive
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
      let targetRole = moderatore.getRole(mentioned);

      //check if they're killing someone dead
      if (!targetRole.alive) {
        embed.sendEmbed(
          [255, 0, 0],
          `${mentioned.toString()} è già morto!`,
          message.channel
        );
        return;
      }

      //turn the discendente into wolf
      if (targetRole.hasTrait("discendente")) {
        discendente(target, message);
        continue;
      }

      //contact the traditore
      if (targetRole.id === roles.traditore) {
        traditore(moderatore, targetRole);
        continue;
      }

      //check if the objective is protetto or the wolf is pazzo
      if (targetRole.hasTrait("protetto") || callerRole.hasTrait("pazzo")) {
        if (callerRole.hasTrait("pazzo")) {
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
      let eatenRole = love.returnAmato(targetRole);

      //remembering who killed the hero
      if (eatenRole.hasTrait("eroe")) {
        let indexEroe = eatenRole.tratto.indexOf("eroe");
        eatenRole.tratto.splice(indexEroe + 1, 0, callerRole);
      }

      //killing the player
      eatenRole.tratto.push("mangiato");
      moderatore.playerDying.push(eatenRole);
    }

    //metto ai lupi il tratto 'usato' per la notte
    for (let wolfRole of moderatore.playerList.values()) {
      if (wolfRole.id === roles.capoBranco || wolfRole.id === roles.lupoDelBranco) {
        wolfRole.tratto.push("usato");
      }
    }
  },
};

function giovaneErr(moderatore, message, mentionedArray) {
  let youngWolfBurned = false;
  //check if the burned is the young wolf
  if (
    moderatore.burnedPlayer !== null &&
    moderatore.getRole(moderatore.burnedPlayer).id === roles.giovaneLupo
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
      player[1].id === roles.capoBranco ||
      player[1].id === roles.giovaneLupo ||
      player[1].id === roles.lupoDelBranco
    )
      lupi += `${player[0].toString()} è un lupo.\n`;
  }
  embed.sendEmbed([149, 193, 255], lupi, playerRole.player);
}
