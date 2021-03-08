module.exports = {
  name: "mode",
  description: "Set the mod of the bot: auto or manual",
  execute(message, args, mod) {
    const embed = require("../functions/sendEmbed.js");
    const err = require("../functions/errors");

    if (args.length !== 1) {
      let modali;
      if (mod.get(message.guild.id)[1]) {
        modali = "Automatica";
      } else {
        modali = "Manuale";
      }
      embed.sendEmbed(
        [149, 193, 255],
        "Modalità attuale: " + modali,
        message.channel
      );
      return;
    }

    if (err.errors([5], mod.get(message.guild.id)[0], message)) return;

    let role = message.guild.roles.cache.find((r) => r.name === "Moderatore");

    if (args[0].valueOf() === "auto") {
      mod.get(message.guild.id)[1] = true;
      role.members.each((member) => member.roles.remove(role));
      embed.sendEmbed(
        [149, 193, 255],
        "Modalità auto attivata",
        message.channel
      );
    } else if (args[0].valueOf() === "manual") {
      message.member.roles.add(role).catch(console.error);
      embed.sendEmbed(
        [149, 193, 255],
        "Modalità auto disattivata",
        message.channel
      );
      mod.get(message.guild.id)[1] = false;
    } else {
      embed.sendEmbed(
        [255, 0, 0],
        "Inserire la modalità `auto` o `manual`",
        message.channel
      );
    }
  },
};
