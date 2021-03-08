module.exports = {
  monaco(moderatore) {
    const embed = require("./sendEmbed.js");

    let mon;
    let presentRole = moderatore.roleListID.slice();

    for (let player of moderatore.playerList.entries()) {
      //sottraggo i ruoli presenti
      if (player[1].id == 11) {
        mon = player[0];
      }

      let indexOf = presentRole.indexOf(player[1].id);
      while (indexOf != -1) {
        //tolgo tutti i ruoli di quel tipo
        presentRole.splice(indexOf, 1);
        indexOf = presentRole.indexOf(player[1].id);
      }
    }

    if (presentRole.length === 0) {
      //controllo se siano rimasti ruoli
      embed.sendEmbed([149, 193, 255], "Tutti i ruoli sono in partita", mon);
      return;
    }

    let ruoliNonPresenti = "";
    let extracted = -1;
    for (let j = 0; j < 2 && j < presentRole.length; j += 1) {
      //estraggo 2 o meno ruoli casuali
      let ran = Math.floor(Math.random() * presentRole.length);

      while (ran === extracted) {
        ran = Math.floor(Math.random() * presentRole.length);
      }

      ruoliNonPresenti += componi(presentRole[ran]) + "\n";

      if (j === 0) {
        extracted = ran;
      }
    }

    embed.sendEmbed([149, 193, 255], ruoliNonPresenti, mon);
  },
};

function componi(id) {
  switch (id) {
    case 1:
      return "Il Bardo";
    case 2:
      return "Il Branco";
    case 3:
      return "Il Contadino";
    case 4:
      return "L'Eremita";
    case 5:
      return "Il Giovane Lupo";
    case 6:
      return "Il Giullare";
    case 7:
      return "Il Guaritore";
    case 8:
      return "Il Lupo del Branco";
    case 9:
      return "Il Mago";
    case 10:
      return "La Medium";
    case 11:
      return "Il Monaco";
    case 12:
      return "L'Oste";
    case 13:
      return "Il Pazzo";
    case 14:
      return "Il Peccatore";
    case 15:
      return "Il Prete";
    case 16:
      return "La Strega";
    case 17:
      return "Il Traditore";
    case 18:
      return "La Veggente";
    case 19:
      return "L'Angelo Custode";
  }
}
