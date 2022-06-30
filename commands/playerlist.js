module.exports = {
  name: "playerlist",
  description: "send in the channel the list of all the player",
  execute(message, moderatore) {
    const embed = require("../functions/sendEmbed.js");
    const err = require("../functions/errors");

    if (err.errors([0], moderatore, message)) return;

    let players = "Lista dei giocatori e attuale status:\n\n";
    for (let player of moderatore.playerList.keys()) {
      players +=
        player.toString() +
        " : " +
        stat(moderatore.getRole(player).alive) +
        "\n";
    }

    embed.sendEmbed([149, 193, 255], players, message.channel);
  },
};

function stat(alive) {
  if (alive) return "Vivo";
  else return "Morto";
}
