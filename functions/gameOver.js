module.exports = {
	execute(message, channel, moderatore){
		const fin = require("../functions/victory.js");
		const embed = require("../functions/sendEmbed.js");
		
		let result = fin.victory(moderatore);
		if(result[0]){
			let mess = result[1];
			if(result[2]){
				if(result[3]){
					mess += ", il Pazzo ed il Giullare";
				}else{
					mess += " ed il Pazzo";
				}

			}else if(result[3]){
				mess += " ed il Giullare";
			}
			mess += "!!\n\n Fine della partita!!\n Digitare `-newGame n` per iniziare una nuova partita oppure \n`-reRoll` per mantenere gli stessi ruoli e giocatori oppure \n`-chooseRole` per cambiare solo i ruoli.";
			embed.sendEmbed([149,193,255], mess, channel);
			moderatore.finished = true;


			let ghostRole = message.guild.roles.cache.find(r => r.name === "Ghost");
			let modRole = message.guild.roles.cache.find(r => r.name === "Moderatore");
			message.guild.members.cache.each(member => member.roles.remove([ghostRole, modRole]));
		} return result[0];
	}
}