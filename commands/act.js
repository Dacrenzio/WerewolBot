const err = require("../functions/errors");
const embed = require("../functions/sendEmbed.js");

module.exports = {
  name: "act",
  description: "Choose the correct command for the player",
  execute(message, args, moderatore) {
    if (err.errors([0, 1, 2, 3, 7, 8], moderatore, message)) return;

    if (message.channel.name.valueOf() != "chat-segreta") {
      message.delete();
      embed.sendEmbed(
        [255, 0, 0],
        "Non sei nel canale segreto",
        message.author
      );
    }

    if (moderatore.getRole(message.member).act(message, moderatore)) {
      message.delete();
      embed.sendEmbed(
        [255, 0, 0],
        "Non hai i permessi per agire.",
        message.author
      );
    }
  },
};
