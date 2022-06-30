const embed = require("./sendEmbed.js");

module.exports = {
  returnAmato(targetRole) {
    let angeloRole = targetRole.tratto[target.tratto.indexOf("amato") + 1];
    if (targetRole.hasTrait("amato") && angeloRole.alive) {
      embed.sendEmbed([149, 193, 255], "Il tuo amato è in pericolo.", angelo);
      return angelo;
    } else {
      return targetRole;
    }
  },

  incrementAmatoVotes(targetRole) {},
};
