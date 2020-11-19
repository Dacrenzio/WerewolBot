module.exports ={
	name: 'protect',
	description: "this command allows the witch to protect 1 player",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const f = require("../figures.js");
		let err = require("../functions/errors");

		if(err.errors([0,1,2,3,7], moderatore, message))return;

		if(message.mentions.members.first() === message.member){
			embed.sendEmbed([255,0,0], "Non puoi proteggere te stessa!", message.channel);
			return;
		}

		
		let mentioned = message.mentions.members.first();
		let caller = moderatore.playerList.get(message.member);
		let called = moderatore.playerList.get(mentioned);

		if(caller.id === f.strega && caller.alive){ //check if he's roleID: 18
				
			if(!called.alive){
				embed.sendEmbed([255,0,0], "Hai protetto un giocatore morto!", message.channel);
				return;
			}

			moderatore.playerList.get(mentioned).tratto.push('protetto');
			return;

		}else{
			message.delete();
			embed.sendEmbed([255,0,0], "Non hai il ruolo adatto per proteggere il prossimo.", message.author);
		}
	}
}