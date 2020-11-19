module.exports = {
	name:'startvotation',
	description: "this command reset the votes of the previus night, check if the ID: ",
	execute(message, args, moderatore, client){
		const embed = require("../functions/sendEmbed.js");
		

		moderatore.numberOfVotes = 0;
		

		if(moderatore.playerNum < 6 || moderatore.playerList.size < moderatore.playerNum){
			embed.sendEmbed([255,0,0], "Mancano dei giocatori o non è stato iniziato un nuovo gioco.", message.channel);
			return;
		}

		let channel = message.member.voice.channel;
		let mod = message.guild.roles.cache.find(r => r.name === "Moderatore").members;
		if(channel != null){
			channel.members.difference(mod).each(member => member.voice.setMute(true));
		} else {
			embed.sendEmbed([255,0,0], "Entrare in una chat vocale per iniziare la votazione.", message.channel);
			return;
		}

		embed.sendEmbed([149, 193, 255], "Verrà creato un canale per ciasciuno votante, scrivete al suo interno `-vote @objective`", message.channel);

		let everyone = message.guild.roles.everyone;

		for(let member of moderatore.playerList.keys()){
			moderatore.playerList.get(member).votes = [];
			if(moderatore.ballottaggio.includes(member) || !moderatore.playerList.get(member).alive)
				continue;

			message.guild.channels.create(member.user.id, 'text')
				.then(r =>{
					r.overwritePermissions([{id: everyone.id, deny:['VIEW_CHANNEL']},
					{id: member.user.id, allow:['VIEW_CHANNEL']},
					{id: client.user.id, allow:['VIEW_CHANNEL']}]);
				});
		}
	}
}