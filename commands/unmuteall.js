module.exports = {
	name: 'unmuteall',
	description: "unmute all the member in the server",
	execute(message, args, moderatore){
		let err = require("../functions/errors");

		if(err.errors([4], moderatore, message))return;

		let bot = message.guild.roles.cache.find(r => r.name === "WereBot").members;
		message.member.difference(bot).voice.channel.members.each(member => member.voice.setMute(false)).catch();
	}
}