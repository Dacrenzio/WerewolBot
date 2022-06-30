module.exports = {
  name: "mode",
  description: "Set the mod of the bot: auto or manual",
  async execute(message, moderatore, args) {
    const embed = require("../functions/sendEmbed.js");
    const err = require("../functions/errors");

    if (args.length !== 1) {
      let modali;
      if (moderatore.automatic) {
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

    if (err.errors([5], moderatore, message)) return;

    await message.guild.members.fetch();
    let role = message.guild.roles.cache.find((r) => r.name === "Moderatore");

    if (args[0].valueOf() === "auto") {
      moderatore.automatic = true;
      role.members.forEach((member) => member.roles.remove(role));
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
      moderatore.automatic = false;
    } else {
      embed.sendEmbed(
        [255, 0, 0],
        "Inserire la modalità `auto` o `manual`",
        message.channel
      );
    }
    await message.guild.members.fetch();
  },
};
