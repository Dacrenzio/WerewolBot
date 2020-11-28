module.exports = {
	description: "gives the Amato trait to someone that is advised",
	execute(message, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const f = require("../figures.js");

		let mentioned = message.mentions.members.first();

		moderatore.playerList.get(mentioned).tratto.push('amato');
		moderatore.playerList.get(mentioned).tratto.push(message.meber);
		
		embed.sendEmbed([149,193,255], "Sei l'amato.", mentioned);
		embed.sendEmbed([0,255,0], `${mentioned.toString()} è stato avvisato`,message.channel);
	}
}