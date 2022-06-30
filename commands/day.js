const embed = require("../functions/sendEmbed.js");
const unMute = require("./unmuteall.js");
const gameOver = require("../functions/gameOver.js");
const f = require("../figures.js");
const err = require("../functions/errors");
const osteria = require("../functions/osteria.js");
const slay = require("../functions/slay.js");
const sing = require("./trySing.js");

module.exports = {
  name: "day",
  description: "unmute all the people, check if the game is over",
  async execute(message, moderatore) {
    if (err.errors([0, 5, 4, 8], moderatore, message)) return;

    //unmuting people
    unMute.execute(message, moderatore);
    sing.stop(message);

    //killing people died during night
    let deadPeopleText = slay.execute(moderatore, message);
    embed.sendEmbed([149, 193, 255], deadPeopleText, message.channel);

    //checking if the game is over
    if (gameOver.execute(message, message.channel, moderatore)) {
      return;
    }

    //controlling bard and Oste
    osteria.sing(moderatore, message);

    //cleaning the dead body
    moderatore.playerDying = [];

    //togliendo la protezione della strega
    for (let playerRole of moderatore.playerList.values()) {
      if (
        playerRole.tratto.includes("protetto") &&
        player[1].id !== f.eremita
      ) {
        let index = playerRole.tratto.indexOf("protetto");
        playerRole.tratto.splice(index, 1);
        break;
      }
    }

    embed.sendEmbed(
      [149, 193, 255],
      "Iniziare le votazioni con `-startVotation`.",
      message.channel
    );
  },
};
