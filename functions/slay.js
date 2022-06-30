const love = require("./amato.js");

module.exports = {
  execute(moderatore, message) {
    let deadPeople = "";
    moderatore.playerDying.forEach((playerRole) => {
      //checking pazzo
      if (playerRole.id === f.pazzo && playerRole.hasTrait("mangiato")) {
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
      if (playerRole.hasTrait("eroe") && playerRole.hasTrait("mangiato")) {
        let revengeRole =
          playerRole.tratto[playerRole.getTraitIndex("eroe") + 1];

        //check if the wolf is the amato
        let amatoRole = love.returnAmato(revengeRole);
        this.slay(message, moderatore, amatoRole);
        deadPeople +=
          amatoRole.player.toString() + " è morto durante la notte.\n";
      }

      this.slay(message, moderatore, playerRole);
      deadPeople +=
        playerRole.player.toString() + " è morto durante la notte.\n";
    });

    if (deadPeople.valueOf() === "") {
      deadPeople = "Nessuno è morto stanotte";
    }
    return deadPeople;
  },

  async slay(message, moderatore, playerRole) {
    playerRole.alive = false;
    moderatore.numberOfDeadPlayer += 1;

    let ghostRole = message.guild.roles.cache.find((r) => r.name === "Ghost");
    await playerRole.player.roles.add(ghostRole).catch(console.error);
  },
};
