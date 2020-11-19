module.exports = {
	name: 'unmuteall',
	description: "unmute all the member in the server",
	execute(message){
		let err = require("../functions/errors");

		if(err.errors([4], moderatore, message))return;
		message.member.voice.channel.members.each(member => member.voice.setMute(false));
	}
}