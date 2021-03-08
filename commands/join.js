module.exports = {
  name: "join",
  description:
    "this command starts a new game of n people and assign the role ''moderator'' to the caller",
  execute(message, args, moderatore) {
    const embed = require("../functions/sendEmbed.js");
    const PlayerRole = require("../functions/PlayerRole.js");

    //someone wants to join
    if (moderatore.playerList.size + 1 <= moderatore.playerNum) {
      //if there's space in the lobby

      //if the player is alredy in the game don't add
      if (moderatore.playerList.has(message.member)) {
        embed.sendEmbed(
          [255, 0, 0],
          "Giocatore gia presente.",
          message.channel
        );
        return;
      }

      //add the player to the list with a standard role
      moderatore.playerList.set(
        message.member,
        new PlayerRole(0, "neutra", false, false, [], false, [])
      );
      message.react("✅");

      if (moderatore.playerList.size === moderatore.playerNum) {
        //when reached the number of player wanted this option will pop-up
        embed.sendEmbed(
          [149, 193, 255],
          "digitare `-chooseRole` seguito dal codice identificativo dei ruoli disponibili senza [] (massimo 1,5 volte il numero di giocatori):\n" +
            "```fix\nIl numero [2] e il numero [18] sono automaticamente inseriti.```\n" +
            "```1 luna```" +
            "[1] Bardo\n" +
            "[~~2~~] Capo branco\n" +
            "[3] Contadino\n" +
            "[4] Eremita\n" +
            "[5] Giovane lupo\n" +
            "[6] Giullare\n" +
            "[7] Guaritore\n" +
            "[8] Lupo del branco\n" +
            "[9] Mago\n" +
            "[10] Medium\n" +
            "[11] Monaco\n" +
            "[12] Oste\n" +
            "[13] Pazzo\n" +
            "[14] Peccatore\n" +
            "[15] Prete\n" +
            "[16] Strega\n" +
            "[17] Traditore\n" +
            "[~~18~~] Veggente\n" +
            "```2 lune```\n" +
            "[19] Angelo custode",
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
  },
};
