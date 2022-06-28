const embed = require("../functions/sendEmbed.js");
const figures = require("../figures.js");
const ytdl = require("ytdl-core");
const err = require("../functions/errors");
const start = require("./next.js");
const sing = require("./trySing.js");

module.exports = {
  name: "night",
  description:
    "this command starts the night and provide the night role order based on the night",
  async execute(message, args, moderatore) {
    if (err.errors([0, 5, 4, 9, 8], moderatore, message)) return;

    sing.execute(message);

    await message.guild.members.fetch();

    let mod = message.guild.roles.cache.find(
      (r) => r.name === "Moderatore"
    ).members;

    message.member.voice.channel.members.difference(mod).each((member) => {
      if (!member.user.bot) member.voice.setMute(true);
    });

    moderatore.nightNum += 1;
    moderatore.ballottaggio = [];

    if (moderatore.nightNum === 1) {
      moderatore.nightOrder = [
        figures.veggente,
        figures.mago,
        figures.monaco,
        figures.prete,
        figures.angelo,
        figures.capoBranco,
      ];
    } else {
      moderatore.nightOrder = [
        figures.veggente,
        figures.medium,
        figures.mago,
        figures.strega,
        figures.capoBranco,
        figures.guaritore,
        0,
      ];
    }

    embed.sendEmbed(
      [149, 193, 255],
      `Inizio della notte N.${moderatore.nightNum}`,
      message.channel
    );
    if (moderatore.automatic) start.execute(message, args, moderatore);
  },
};
