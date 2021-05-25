const embed = require("../functions/sendEmbed.js");
const err = require("../functions/errors");
const f = require("../figures.js");
const aura = require("../functions/role actions/aura.js");
const heal = require("../functions/role actions/heal.js");
const mistic = require("../functions/role actions/mistic.js");
const protect = require("../functions/role actions/protect.js");
const amato = require("../functions/role actions/amato.js");

    module.exports = {
  name: "act",
  description: "Choose the correct command for the player",
  execute(message, args, moderatore) {
    

    if (err.errors([0, 1, 2, 3, 7, 8], moderatore, message)) return;

    let caller = moderatore.playerList.get(message.member);

    switch (caller.id) {
      case f.veggente:
      case f.medium:
        aura.execute(message, moderatore);
        break;

      case f.mago:
        mistic.execute(message, moderatore);
        break;

      case f.strega:
        protect.execute(message, moderatore);
        break;

      case f.guaritore:
        heal.execute(message, moderatore);
        break;

      case f.angelo:
        amato.execute(message, moderatore);
        break;

      default:
        message.delete();
        embed.sendEmbed(
          [255, 0, 0],
          "Non hai il ruolo adatto.",
          message.author
        );
    }
  },
};
