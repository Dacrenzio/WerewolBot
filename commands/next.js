module.exports = {
  name: "next",
  description:
    "this metod call the next figure that has to play and gives the respective role to the player",
  async execute(message, args, moderatore, auto) {
    const embed = require("../functions/sendEmbed.js");
    const f = require("../figures.js");
    const err = require("../functions/errors");
    const recursive = require("./next.js");
    const mon = require("../functions/monaco.js");
    const day = require("./day.js");

    await message.guild.members.fetch();
    let secretRole = message.guild.roles.cache.find((r) => r.name === "Secret"); //rimuovo il ruolo segreto
    for (i = 0; i < secretRole.members.array().length; i++) {
      await secretRole.members.array()[i].roles.remove(secretRole);
    }
    await message.guild.members.fetch();

    if (err.errors([0, 8], moderatore, message)) return;

    let general = message.guild.channels.cache.find(
      (c) => c.name === "generale"
    );
    let secret = message.guild.channels.cache.find(
      (r) => r.name === "chat-segreta"
    );

    if (moderatore.nightOrder.length === 0) {
      if (!auto) {
        embed.sendEmbed(
          [149, 193, 255],
          "Ruoli terminati, iniziare il giorno con `-day`",
          general
        );
      } else {
        day.execute(message, args, moderatore);
      }

      return;
    }

    let roleID = moderatore.nightOrder.shift(); //faccio venire il prossimo ruolo che deve giocare

    if (roleID === f.guaritore) {
      //after the wolves the pazzo effect is gone
      for (let wolves of moderatore.playerList.entries()) {
        if (wolves[1].id === f.capoBranco || wolves[1].id === f.lupoDelBranco) {
          //rimuovo il tratto pazzo
          let index = wolves[1].tratto.indexOf("pazzo");
          if (index != -1) {
            moderatore.playerList.get(wolves[0]).tratto.splice(index, 1);
          }
        }
      }
    }

    while (!moderatore.roleListID.includes(roleID)) {
      if (moderatore.nightOrder.length === 0) {
        if (!auto) {
          embed.sendEmbed(
            [149, 193, 255],
            "Ruoli terminati, iniziare il giorno con `-day`",
            general
          );
        } else {
          day.execute(message, args, moderatore);
        }
        return;
      }

      roleID = moderatore.nightOrder.shift();
    }

    let lupi = "";
    for (let player of moderatore.playerList.entries()) {
      if (
        player[1].id === roleID ||
        (roleID === f.capoBranco && player[1].id === f.giovaneLupo) ||
        (roleID === f.capoBranco && player[1].id === f.lupoDelBranco) ||
        (roleID === f.capoBranco &&
          player[1].id === f.traditore &&
          moderatore.nightNum === 1)
      ) {
        switch (roleID) {
          case f.guaritore:
            if (player[1].tratto.includes("usato")) {
              break;
            }

            let morenti = "";
            moderatore.playerDying.forEach(
              (dying) => (morenti += `${dying.toString()} sta morendo\n`)
            );
            if (morenti.valueOf() === "") {
              morenti = "Nessuno sta morendo.";
            }

            await player[0].roles.add(secretRole);
            setTimeout(() => {
              embed.sendEmbed([149, 193, 255], morenti, secret);
            }, 4000);
            break;

          case f.mago:
          case f.medium:
          case f.strega:
          case f.veggente:
          case f.angelo:
            await player[0].roles.add(secretRole);
            break;

          case 2: //lupi
            if (moderatore.nightNum === 1) {
              if (player[1].id === f.capoBranco) {
                lupi += `${player[0].toString()} è il Capo Branco\n`;
              } else if (player[1].id === f.lupoDelBranco) {
                lupi += `${player[0].toString()} è un Lupo del Branco\n`;
              } else if (player[1].id === f.giovaneLupo) {
                lupi += `${player[0].toString()} è il Giovane Lupo\n`;
              } else {
                lupi += `${player[0].toString()} è il Traditore\n`;
                break;
              }
            }
            let index = player[1].tratto.indexOf("usato");
            moderatore.playerList.get(player[0]).tratto.splice(index, 1);
            await player[0].roles.add(secretRole);
            break;

          case f.monaco:
            mon.monaco(moderatore);
            break;

          case f.prete:
            for (let player2 of moderatore.playerList.entries()) {
              if (player2[1].id === f.peccatore) {
                embed.sendEmbed(
                  [149, 193, 255],
                  `${player2[0].toString()} è il Peccatore`,
                  player[0]
                );
                embed.sendEmbed(
                  [149, 193, 255],
                  `${
                    componi(roleID)[0]
                  } ti è stato mandato un messaggio privato`,
                  general
                );
                recursive.execute(message, args, moderatore, auto);
                return;
              }
            }

            embed.sendEmbed(
              [149, 193, 255],
              "Il Peccatore non è in gioco",
              player[0]
            );
            break;
        }
      }
    }

    //la prima sera scrivi ai lupi
    if (moderatore.nightNum === 1 && roleID === 2) {
      setTimeout(() => {
        embed.sendEmbed([149, 193, 255], lupi, secret);
      }, 10000);
    }

    //il monaco e il prete non aspettano i 45 secondi
    if (roleID === f.monaco || roleID === f.prete) {
      embed.sendEmbed(
        [149, 193, 255],
        `${componi(roleID)[0]} ti è stato mandato un messaggio privato`,
        general
      );
      recursive.execute(message, args, moderatore, auto);
      return;
    }

    embed.sendEmbed(
      [149, 193, 255],
      `${componi(roleID)[0]} è il tuo turno${componi(roleID)[1]}`,
      general
    );

    if (auto) {
      setTimeout(() => {
        embed.sendEmbed([149, 193, 255], "mancano 15 secondi", secret);
      }, 30000);
      setTimeout(() => {
        embed.sendEmbed([149, 193, 255], "mancano 15 secondi", general);
      }, 30000);
      setTimeout(() => {
        recursive.execute(message, args, moderatore, auto);
      }, 45000);
    }
  },
};

function componi(id) {
  switch (id) {
    case 2:
      return ["Il Branco", ", comando: `-kill @objective`"];
    case 7:
      return ["Il Guaritore", ", comando: `-act @objective`"];
    case 9:
      return ["Il Mago", ", comando: `-act @objective`"];
    case 10:
      return ["La Medium", ", comando: `-act @objective`"];
    case 11:
      return ["Il Monaco", ""];
    case 15:
      return ["Il Prete", ""];
    case 16:
      return ["La Strega", ", comando: `-act @objective`"];
    case 18:
      return ["La Veggente", ", comando: `-act @objective`"];
    case 19:
      return ["L'Angelo Custode", ", comando: `-act @objective`"];
  }
}
