module.exports = {
  name: "startvotation",
  description:
    "this command reset the votes of the previus night, check if the ID: ",
  async execute(message, moderatore, args, client) {
    const embed = require("../functions/sendEmbed.js");
    const err = require("../functions/errors");

    if (err.errors([0, 4, 5, 8], moderatore, message)) return;

    moderatore.numberOfVotes = 0;

    await message.guild.members.fetch();
    let channel = message.member.voice.channel;
    let mod = message.guild.roles.cache.find(
      (r) => r.name === "Moderatore"
    ).members;

    channel.members
      .difference(mod)
      .each((member) => member.voice.setMute(true));

    embed.sendEmbed(
      [149, 193, 255],
      "Verrà creato un canale per ciasciuno votante, scrivete al suo interno `-vote @objective`",
      message.channel
    );

    let everyone = message.guild.roles.everyone;

    for (let member of moderatore.playerList.keys()) {
      moderatore.playerList.get(member).votes = [];
      if (
        moderatore.ballottaggio.includes(member) ||
        !moderatore.playerList.get(member).alive
      )
        continue;

      message.guild.channels.create(member.user.id, "text").then((r) => {
        r.overwritePermissions([
          { id: everyone.id, deny: ["VIEW_CHANNEL"] },
          { id: member.user.id, allow: ["VIEW_CHANNEL"] },
          { id: client.user.id, allow: ["VIEW_CHANNEL"] },
        ]);
      });
    }
  },
};
