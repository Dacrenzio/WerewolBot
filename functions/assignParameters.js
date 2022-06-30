module.exports = {
  execute(moderatore) {
    let secretID = ["", "eroe", "discendente"];

    for (let playerRole of moderatore.playerList.values()) {
      sendCard(playerRole.player, playerRole.id);

      playerRole.assignStandardParameters();

      switch (playerRole.id) {
        case 1:
        case 11:
        case 12:
        case 15:
          break;

        case 4:
          playerRole.tratto = ["protetto"];
          break;

        case 6:
        case 13:
        case 17:
        case 19:
          playerRole.fazione = "-";
          break;

        case 7:
        case 9:
        case 10:
        case 16:
        case 18:
          playerRole.misticismo = true;
          break;

        case 2:
        case 5:
        case 8:
          playerRole.fazione = "lupi";
          playerRole.tratto = ["ombra"];

        case 14:
          playerRole.aura = true;
          break;

        case 3:
          let ran = Math.floor(Math.floor(Math.random() * secretID.length));
          if (ran != 0) {
            playerRole.tratto.push(secretID.splice(ran, 1)[0]);
          }
          break;

        default:
          console.log(`something went wrong; ID: ${playerRole.id}`);
      }
    }
  },
};

function sendCard(user, id) {
  switch (id) {
    case 1:
      user.send({ content: "https://wherewolf.fandom.com/it/wiki/Il_Bardo" });
      break;
    case 2:
      user.send({
        content: "https://wherewolf.fandom.com/it/wiki/Il_Capo_Branco",
      });
      break;
    case 3:
      user.send({
        content: "https://wherewolf.fandom.com/it/wiki/Il_Contadino",
      });
      break;
    case 4:
      user.send({ content: "https://wherewolf.fandom.com/it/wiki/L'Eremita" });
      break;
    case 5:
      user.send({
        content: "https://wherewolf.fandom.com/it/wiki/Il_Giovane_Lupo",
      });
      break;
    case 6:
      user.send({
        content: "https://wherewolf.fandom.com/it/wiki/Il_Giullare",
      });
      break;
    case 7:
      user.send({
        content: "https://wherewolf.fandom.com/it/wiki/Il_Guaritore",
      });
      break;
    case 8:
      user.send({
        content: "https://wherewolf.fandom.com/it/wiki/Il_Lupo_del_Branco",
      });
      break;
    case 9:
      user.send({ content: "https://wherewolf.fandom.com/it/wiki/Il_Mago" });
      break;
    case 10:
      user.send({ content: "https://wherewolf.fandom.com/it/wiki/Il_Medium" });
      break;
    case 11:
      user.send({ content: "https://wherewolf.fandom.com/it/wiki/Il_Monaco" });
      break;
    case 12:
      user.send({ content: "https://wherewolf.fandom.com/it/wiki/L'Oste" });
      break;
    case 13:
      user.send({ content: "https://wherewolf.fandom.com/it/wiki/Il_Pazzo" });
      break;
    case 14:
      user.send({
        content: "https://wherewolf.fandom.com/it/wiki/Il_Peccatore",
      });
      break;
    case 15:
      user.send({ content: "https://wherewolf.fandom.com/it/wiki/Il_Prete" });
      break;
    case 16:
      user.send({ content: "https://wherewolf.fandom.com/it/wiki/La_Strega" });
      break;
    case 17:
      user.send({
        content: "https://wherewolf.fandom.com/it/wiki/Il_Traditore",
      });
      break;
    case 18:
      user.send({
        content: "https://wherewolf.fandom.com/it/wiki/La_Veggente",
      });
      break;
    case 19:
      user.send({
        content: "https://wherewolf.fandom.com/it/wiki/L'Angelo_Custode",
      });
      break;
  }
}
