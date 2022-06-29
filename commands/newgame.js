module.exports = {
  name: "newgame",
  description:
    "this command starts a new game of n people and assign the role ''moderator'' to the caller",
  async execute(message, args, moderatore) {
    const embed = require("../functions/sendEmbed.js");
    const err = require("../functions/errors");

    if (args.length !== 1) {
      embed.sendEmbed(
        [255, 0, 0],
        "Scrivere anche il numero di giocatori.",
        message.channel
      );
      return;
    }

    if (err.errors([6], moderatore, message)) return;

    if (parseInt(args[0]) < 6) {
      embed.sendEmbed(
        [255, 0, 0],
        "Siete in pochi per giocare!",
        message.channel
      );
      return;
    }

    await message.guild.members.fetch();
    let role = message.guild.roles.cache.find((r) => r.name === "Moderatore");
    for (i = 0; i < role.members.values().length; i++) {
      await ghostRole.members.values()[i].roles.remove(role);
    }
    await message.guild.members.fetch();

    if (!moderatore.automatic)
      await message.member.roles.add(role).catch(console.error);

    embed.sendEmbed(
      [149, 193, 255],
      "Creato nuovo game, gli utenti che intendono giocare scrivano `-join`",
      message.channel
    );

    //start a new Game
    moderatore.newGame(parseInt(args[0]), message);
  },
};
