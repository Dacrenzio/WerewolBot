const love = require("./amato.js");

module.exports = {
  execute(moderatore, message) {
    let deadPeople = "";
    moderatore.playerDying.forEach((member) => {
      let deadPlayerRole = moderatore.getRole(member);

      //checking pazzo
      if (
        deadPlayerRole.id === f.pazzo &&
        deadPlayerRole.hasTrait("mangiato")
      ) {
        //attivazione del pazzo
        for (let playerRole of moderatore.playerList.values()) {
          if (
            playerRole.id === f.capoBranco ||
            playerRole.id === f.lupoDelBranco
          ) {
            playerRole.pushTrait("pazzo");
          }
        }
      }

      //checking eroe
      if (
        deadPlayerRole.hasTrait("eroe") &&
        deadPlayerRole.hasTrait("mangiato")
      ) {
        let revengeRole =
          deadPlayerRole.tratto[deadPlayerRole.tratto.indexOf("eroe") + 1];

        //check if the wolf is the amato
        let amatoRole = love.returnAmato(revengeRole);
        slay(message, moderatore, amatoRole);
        deadPeople +=
          amatoRole.player.toString() + " è morto durante la notte.\n";
      }

      slay(message, moderatore, member);
      deadPeople += member.toString() + " è morto durante la notte.\n";
    });

    if (deadPeople.valueOf() === "") {
      deadPeople = "Nessuno è morto stanotte";
    }
    moderatore.playerDying = [];
    return deadPeople;
  },
};

async function slay(message, moderatore, member) {
  moderatore.getRole(member).alive = false;
  moderatore.numberOfDeadPlayer += 1;

  let ghostRole = message.guild.roles.cache.find((r) => r.name === "Ghost");
  await member.roles.add(ghostRole).catch(console.error);
}
