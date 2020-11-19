module.exports = {
	execute(message, channel, moderatore){
		const fin = require("../functions/victory.js");
		
		let result = fin.victory(moderatore);
		if(result[0]){
			let mess = result[1];
			if(result[2]){
				if(result[3]){
					mess += ", il Pazzo ed il Giullare";
				}
				mess += " ed il Pazzo";
			}else if(result[3]){
				mess += " ed il Giullare";
			}
			mess += "!!\n\n Fine della partita, digitare `-newGame n` per iniziare una nuova partita!";
			embed.sendEmbed([149,193,255], mess, channel);


			moderatore.playerNum = -1;
			moderatore.playerList.clear();

			let ghostRole = message.guild.roles.cache.find(r => r.name === "Ghost");
			let modRole = message.guild.roles.cache.find(r => r.name === "Moderatore");
			message.guild.members.cache.each(member => member.roles.remove([ghostRole, modRole]));
		} return result[0];
	}
}