const embed = require("../functions/sendEmbed.js");
const f = require("../figures.js");
const err = require("../functions/errors");
const recursive = require("./next.js");
const day = require("./day.js");

module.exports = {
  name: "next",
  description:
    "this metod call the next figure that has to play and gives the respective role to the player",
  async execute(message, args, moderatore) {
    //rimuovo il ruolo segreto
    await message.guild.members.fetch();
    let secretRole = message.guild.roles.cache.find((r) => r.name === "Secret");
    for (i = 0; i < secretRole.members.array().length; i++) {
      await secretRole.members.array()[i].roles.remove(secretRole);
    }
    await message.guild.members.fetch();

    if (err.errors([0, 8], moderatore, message)) return;

    //getting the channels
    let general = message.guild.channels.cache.find(
      (c) => c.name === "generale"
    );
    let secret = message.guild.channels.cache.find(
      (r) => r.name === "chat-segreta"
    );

    //check if the night is over
    if (!moderatore.hasNightRoleLeft()) {
      if (!moderatore.automatic) {
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

    //inizializzo il prossimo ruolo
    let roleID,
      lupi = moderatore.nextRole(message, general, secretRole);

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
      recursive.execute(message, args, moderatore);
      return;
    }

    embed.sendEmbed(
      [149, 193, 255],
      `${componi(roleID)[0]} è il tuo turno${componi(roleID)[1]}`,
      general
    );

    if (moderatore.automatic) {
      setTimeout(() => {
        embed.sendEmbed([149, 193, 255], "mancano 15 secondi", secret);
      }, 30000);
      setTimeout(() => {
        embed.sendEmbed([149, 193, 255], "mancano 15 secondi", general);
      }, 30000);
      setTimeout(() => {
        recursive.execute(message, args, moderatore);
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
