const ytdl = require("ytdl-core");
const voice = require("@discordjs/voice");

module.exports = {
  name: "trysing",
  description: "",
  execute(message) {
    const stream = ytdl("https://youtu.be/-heSRbvCErU", {
      filter: "audioonly",
    });
    const player = voice.createAudioPlayer();
    const resource = voice.createAudioResource(stream);

    let connection = voice.joinVoiceChannel({
      channelId: message.member.voice.channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    connection.subscribe(player);
    player.play(resource);
  },
  stop(message) {
    let connection = voice.getVoiceConnection(message.guild.id);
    connection.disconnect();
    connection.destroy();
  },
};
