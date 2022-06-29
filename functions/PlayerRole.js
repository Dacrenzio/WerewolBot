const f = require("../figures.js");
const mon = require("../functions/monaco.js");

module.exports = class PlayerRole {
  player = null;
  id = 0;
  fazione = "neutral";
  aura = false;
  misticismo = false;
  tratto = [];
  alive = false;
  votes = [];

  constructor(player) {
    this.player = player;
  }

  setID(id) {
    this.id = id;
  }

  removeTrait(trait) {
    let index = wolves[1].tratto.indexOf(trait);
    if (index != -1) {
      this.tratto.splice(index, 1);
    }
  }

  isHisTurn(roleID, nightNum) {
    return (
      this.id === roleID ||
      (roleID === f.capoBranco && this.id === f.giovaneLupo) ||
      (roleID === f.capoBranco && this.id === f.lupoDelBranco) ||
      (roleID === f.capoBranco && this.id === f.traditore && nightNum === 1)
    );
  }

  async startTurn(roleID, moderatore, secretRole) {
    let lupi = "";
    switch (roleID) {
      case f.guaritore:
        if (this.tratto.includes("usato")) {
          break;
        }

        let morenti = "";
        moderatore.playerDying.forEach(
          (dying) => (morenti += `${dying.toString()} sta morendo\n`)
        );
        if (morenti.valueOf() === "") {
          morenti = "Nessuno sta morendo.";
        }

        await player.roles.add(secretRole);
        setTimeout(() => {
          embed.sendEmbed([149, 193, 255], morenti, secret);
        }, 4000);
        break;

      case f.mago:
      case f.medium:
      case f.strega:
      case f.veggente:
      case f.angelo:
        await player.roles.add(secretRole);
        break;

      case 2: //lupi
        if (moderatore.nightNum === 1) {
          if (this.id === f.capoBranco) {
            lupi += `${player.toString()} è il Capo Branco\n`;
          } else if (this.id === f.lupoDelBranco) {
            lupi += `${player.toString()} è un Lupo del Branco\n`;
          } else if (this.id === f.giovaneLupo) {
            lupi += `${player.toString()} è il Giovane Lupo\n`;
          } else {
            lupi += `${player.toString()} è il Traditore\n`;
            break;
          }
        }
        this.removeTrait("usato");
        await player.roles.add(secretRole);
        break;

      case f.monaco:
        mon.monaco(moderatore);
        break;

      case f.prete:
        moderatore.playerList.forEach((key, value) => {
          if (value.id === f.peccatore) {
            embed.sendEmbed(
              [149, 193, 255],
              `${key.toString()} è il Peccatore`,
              player
            );
          }
        });

        embed.sendEmbed([149, 193, 255], "Il Peccatore non è in gioco", player);
        break;
    }
    return lupi;
  }

  assignStandardParameters() {
    this.fazione = "villaggio";
    this.aura = false;
    this.misticismo = false;
    this.tratto = [];
    this.alive = true;
    this.votes = [];
  }
};
