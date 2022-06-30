const embed = require("../functions/sendEmbed.js");
const gameOver = require("../functions/gameOver.js");
const slay = require("./slay.js");

module.exports = {
  execute(message, moderatore) {
    let channel = message.guild.channels.cache.find(
      (c) => c.name === "generale"
    );

    if (moderatore.ballottaggio.length > 0) {
      //if in ballottaggio

      //controllo il giullare
      if (giullare(moderatore)) return;

      let results = getMostVoted(moderatore);

      let highest = results[0];
      let even = results[2];
      let playerBurnRole = results[3];

      //if it's even votes
      if (highest === even) {
        embed.sendEmbed([149, 193, 255], "Votazione annullata", channel);
        moderatore.burnedPlayer = null;
        moderatore.ballottaggio = [];
        return;
      } else {
        embed.sendEmbed(
          [149, 193, 255],
          `Il rogo di stasera brucia ${playerBurnRole.player.toString()}`,
          channel
        );

        //burn the player with the most votes
        burnPlayer(moderatore, playerBurnRole);

        //check game over
        gameOver.execute(message, channel, moderatore);
        return;
      }
    } else {
      //se non siamo nel ballottaggio

      let results = getMostVoted(moderatore);

      let highest = results[0];
      let secondHighest = results[1];
      let playerBurnRole = results[3];

      if (highest >= moderatore.playerNum - moderatore.numberOfDeadPlayer - 1) {
        //se e stata votata una sola persona
        burnPlayer(moderatore, playerBurnRole);

        //check if game over
        gameOver.execute(message, channel, moderatore);
        return;
      }

      //popoliamo il ballottaggio
      let nominati = "";
      for (let playerRole of moderatore.playerList.values()) {
        if (
          playerRole.votes.length === highest ||
          playerRole.votes.length === secondHighest
        ) {
          moderatore.ballottaggio.push(playerRole);
          nominati += `${playerRole.player.toString()}\n`;
        }
      }

      //se tutti hanno votato tutti
      if (
        moderatore.ballottaggio.length ===
        moderatore.playerNum - moderatore.numberOfDeadPlayer
      ) {
        embed.sendEmbed([149, 193, 255], "Votazione annullata", channel);
        moderatore.burnedPlayer = null;
        return;
      } else {
        embed.sendEmbed(
          [149, 193, 255],
          nominati + "Sono chiamati al ballottaggio.",
          channel
        );
      }
    }
  },
};

function getMostVoted(moderatore, ballottaggio) {
  let playerBurnRole = null;
  let highest = -1;
  let even = -1;
  let secondHighest = -1;

  let playerList = moderatore.playerList.values();

  if (ballottaggio) {
    playerList = moderatore.ballottaggio;
  }

  for (let playerRole of playerList) {
    //cerca i due voti piu alti
    if (playerRole.votes.length >= highest) {
      even = highest;
      highest = playerRole.votes.length;
      playerBurnRole = playerRole;
    } else if (playerRole.votes.length > secondHighest) {
      secondHighest = playerRole.votes.length;
    }
  }

  return [highest, secondHighest, even, playerBurnRole];
}

function giullare(moderatore) {
  if (
    //controllo se il giullare è stato bruciato la notte scorsa
    moderatore.burnedPlayer != null &&
    moderatore.burnedPlayer.id === 6
  ) {
    embed.sendEmbed([149, 193, 255], "Votazione annullata", channel);
    moderatore.burnedPlayer = null;
    return true;
  }

  return false;
}

function burnPlayer(moderatore, playerBurnRole) {
  if (giullare(moderatore)) return;
  embed.sendEmbed(
    [149, 193, 255],
    `Il rogo di stasera brucia ${playerBurnRole.player.toString()}`,
    channel
  );
  moderatore.burnedPlayer = playerBurnRole;
  slay.slay(message, moderatore, playerBurnRole);
  moderatore.burnedPlayer.pushTrait("bruciato");
}
