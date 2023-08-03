const roles = require("../figures.json");
const embed = require("./sendEmbed.js");

const aura = require("./role actions/aura.js");
const heal = require("./role actions/heal.js");
const mistic = require("./role actions/mistic.js");
const protect = require("./role actions/protect.js");
const amato = require("./role actions/angelo.js");
const mon = require("./monaco.js");

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

  hasTrait(trait) {
    return this.tratto.indexOf(trait) != -1;
  }

  pushTrait(trait) {
    if (!this.hasTrait(trait)) {
      this.tratto.push(trait);
    }
  }

  removeTrait(trait) {
    let index = this.tratto.indexOf(trait);
    if (index != -1) {
      switch (trait.valueOf()) {
        case "eroe":
          index += 1;
        default:
      }

      this.tratto.splice(index, 1);
    }
  }

  isHisTurn(currentRoleID, nightNum) {
    return (
      this.id === currentRoleID ||
      (currentRoleID === roles.capoBranco && this.id === roles.giovaneLupo) ||
      (currentRoleID === roles.capoBranco && this.id === roles.lupoDelBranco) ||
      (currentRoleID === roles.capoBranco &&
        this.id === roles.traditore &&
        nightNum === 1)
    );
  }

  async startTurn(currentRoleID, moderatore, secretRole) {
    let lupi = "";
    switch (currentRoleID) {
      case roles.guaritore:
        let morenti = "";
        moderatore.playerDying.forEach(
          (dyingRole) =>
            (morenti += `${dyingRole.player.toString()} sta morendo\n`)
        );
        if (morenti.valueOf() === "") {
          morenti = "Nessuno sta morendo.";
        }

        await player.roles.add(secretRole);
        setTimeout(() => {
          embed.sendEmbed([149, 193, 255], morenti, secret);
        }, 4000);
        break;

      case roles.mago:
      case roles.medium:
      case roles.strega:
      case roles.veggente:
      case roles.angelo:
        await player.roles.add(secretRole);
        break;

      case 2: //lupi
        if (moderatore.nightNum === 1) {
          if (this.id === roles.capoBranco) {
            lupi += `${player.toString()} è il Capo Branco\n`;
          } else if (this.id === roles.lupoDelBranco) {
            lupi += `${player.toString()} è un Lupo del Branco\n`;
          } else if (this.id === roles.giovaneLupo) {
            lupi += `${player.toString()} è il Giovane Lupo\n`;
          } else {
            lupi += `${player.toString()} è il Traditore\n`;
            break;
          }
        }
        this.removeTrait("usato");
        await player.roles.add(secretRole);
        break;

      case roles.monaco:
        mon.monaco(moderatore);
        break;

      case roles.prete:
        moderatore.playerList.forEach((key, value) => {
          if (value.id === roles.peccatore) {
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

  act(message, moderatore) {
    if (moderatore.currentRoleID != this.id) {
      return false;
    } else {
      switch (this.id) {
        case roles.veggente:
        case roles.medium:
          aura.execute(message, moderatore);
          break;

        case roles.mago:
          mistic.execute(message, moderatore);
          break;

        case roles.strega:
          protect.execute(message, moderatore);
          break;

        case roles.guaritore:
          heal.execute(message, moderatore);
          break;

        case roles.angelo:
          amato.execute(message, moderatore);
          break;

        default:
          return false;
      }
    }

    return true;
  }

  addVote(member) {
    this.votes.push(member);
  }

  assignStandardParameters() {
    this.fazione = "villaggio";
    this.aura = false;
    this.misticismo = false;
    this.tratto = [];
    this.alive = true;
    this.votes = [];
  }

  getTraitIndex(trait) {
    return this.tratto.indexOf(trait);
  }
};
