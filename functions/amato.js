const embed = require("./sendEmbed.js");

module.exports = {
  returnAmato(targetRole) {
    let angeloRole = targetRole.tratto[target.getTraitIndex("amato") + 1];
    if (targetRole.hasTrait("amato") && angeloRole.alive) {
      embed.sendEmbed([149, 193, 255], "Il tuo amato è in pericolo.", angelo);
      return angelo;
    } else {
      return targetRole;
    }
  },

  incrementAmatoVotes(targetRole) {
    let indAmato = targetRole.getTraitIndex("amato");
    let angeloRole = targetRole.tratto[indAmato + 1];
    if (targetRole.hasTrait("amato") && angeloRole.alive) {
      angeloRole.addvote(targetRole.player);
    } else {
      targetRole.addvote(targetRole.player);
    }
  },
};
