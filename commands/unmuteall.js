module.exports = {
	name: 'unmuteall',
	description: "unmute all the member in the server",
	execute(message, args, moderatore){

		message.guild.roles.everyone.members.each(member => member.voice.setMute(false));
	}
}