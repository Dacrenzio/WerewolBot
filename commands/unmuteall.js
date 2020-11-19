module.exports = {
	name: 'unmuteall',
	description: "unmute all the member in the server",
	execute(message){
		message.member.voice.channel.members.each(member => member.voice.setMute(false));
	}
}