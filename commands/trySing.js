const ytdl = require("ytdl-core");

module.exports = {
  name: "trysing",
  description: "",
  async execute(message, args, moderatore) {
    await message.member.voice.channel.join().then((connection) => {
      connection.play(ytdl("https://youtu.be/-heSRbvCErU"));
    });
  },
};
