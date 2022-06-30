const embed = require("../functions/sendEmbed.js");
const check = require("../functions/checkVotes.js");
const err = require("../functions/errors");
const unMute = require("./unmuteall.js");

module.exports = {
  name: "vote",
  description: "this command allows player to vote someone",
  execute(message, moderatore) {
    if (message.channel.name.valueOf() !== message.member.user.id.valueOf()) {
      message.delete();
      embed.sendEmbed(
        [255, 0, 0],
        "Hai mandato il voto nella chat sbagliata!",
        message.channel
      );
      return;
    }

    if (err.errors([0, 1, 2, 3, 4, 5, 8], moderatore, message)) return;

    let mentioned = message.mentions.members.first();
    if (
      moderatore.ballottaggio.length > 0 &&
      !moderatore.ballottaggio.includes(mentioned)
    ) {
      embed.sendEmbed(
        [255, 0, 0],
        "Hai votato una persona che non è in ballottaggio!",
        message.channel
      );
      return true;
    }

    //checking the amato
    let indAmato = moderatore.get(mentioned).tratto.indexOf("amato");
    let angelo = moderatore.playerList.get(mentioned).tratto[indAmato + 1];
    if (indAmato != -1 && moderatore.playerList.get(angelo).alive) {
      moderatore.playerList.get(angelo).votes.push(message.member);
    } else {
      moderatore.playerList.get(mentioned).votes.push(message.member);
    }

    moderatore.numberOfVotes += 1;
    embed.sendEmbed(
      [0, 255, 0],
      "Il tuo voto è stato accettato!",
      message.member
    );

    if (
      moderatore.numberOfVotes ===
      moderatore.playerList.size -
        moderatore.numberOfDeadPlayer -
        moderatore.ballottaggio.length
    ) {
      //unmuting people
      unMute.execute(message, moderatore);
      check.execute(message, moderatore);
    }
    message.channel.delete();
  },
};
