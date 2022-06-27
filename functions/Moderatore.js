const PlayerRole = require("./PlayerRole.js");
const embed = require("../functions/sendEmbed.js");

module.exports = class Moderatore {
  nightNum = 0;
  playerNum = -1;
  auraType = false;
  playerList = new Map();
  playerDying = [];
  roleListID = [];
  nightOrder = [];
  burnedPlayer = null;
  numberOfVotes = 0;
  ballottaggio = [];
  numberOfDeadPlayer = 0;
  finished = true;

  addPlayer(guildMember) {
    this.playerList.set(guildMember, new PlayerRole());
    return false;
  }

  arePlayerFull() {
    return this.playerList.size === this.playerNum;
  }

  canJoin(message) {
    if (this.playerList.size + 1 <= this.playerNum) {
      //if there's space
      if (!this.playerList.has(message.member)) {
        //if the player isn't alredy joined
        return true;
      } else {
        embed.sendEmbed(
          [255, 0, 0],
          "Giocatore gia presente.",
          message.channel
        );
      }
    } else {
      embed.sendEmbed(
        [255, 0, 0],
        "Raggiunto il numero massimo di giocatori!",
        message.channel
      );
    }

    return false;
  }

  async newGame(numberOfPlayer) {
    this.reset();
    this.playerNum = numberOfPlayer;
    this.roleListID = [2, 18];

    await message.guild.members.fetch();
    let ghostRole = message.guild.roles.cache.find((r) => r.name === "Ghost");
    for (i = 0; i < ghostRole.members.array().length; i++) {
      await ghostRole.members.array()[i].roles.remove(ghostRole);
    }
    await message.guild.members.fetch();
  }

  addRoles(args, message) {
    let validArgs = true;
    args.forEach((element) => {
      elem = parseInt(element);
      if (elem >= 1 && elem <= 19 && elem != 2 && elem != 18) {
        this.roleListID.push(elem);
      } else {
        embed.sendEmbed(
          [255, 0, 0],
          "Hai inserito un ID invalido!",
          message.channel
        );
        this.roleListID = [2, 18];
        validArgs = false;
      }
    });
    return validArgs;
  }

  getPlayerList() {
    return this.playerList;
  }

  getPlayerNum() {
    return this.playerNum;
  }

  getRoleListID() {
    return this.roleListID;
  }

  reset() {
    this.nightNum = 0;
    this.playerNum = -1;
    this.auraType = false;
    this.playerList = new Map();
    this.playerDying = [];
    this.roleListID = [];
    this.nightOrder = [];
    this.burnedPlayer = null;
    this.numberOfVotes = 0;
    this.ballottaggio = [];
    this.numberOfDeadPlayer = 0;
    this.finished = true;
  }
};
