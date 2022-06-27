const embed = require("../functions/sendEmbed.js");

module.exports = {
  name: "reset",
  description: "Choose the correct command for the player",
  execute(message, args, moderatore) {
    //this command reset the moderatore

    moderatore.reset();

    embed.sendEmbed(
      [0, 0, 0],
      "Il moderatore è stato resettato.",
      message.channel
    );
  },
};
