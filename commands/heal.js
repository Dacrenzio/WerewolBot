module.exports={
	name: 'heal',
	description: "let the Healer to heal a Dying player",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const f = require("../figures.js");
		let err = require("../functions/errors");

		if(err.errors([0,1,2,3,7,8], moderatore, message))return;

		if(message.mentions.members.first() === message.member){
			embed.sendEmbed([255,0,0], "Non puoi guarire te stessa!", message.channel);
			return;
		}
		
		let mentioned = message.mentions.members.first();
		let caller = moderatore.playerList.get(message.member);

		if(caller.id === f.guaritore && caller.alive){

			if(caller.tratto.includes('usato')){
				embed.sendEmbed([255,0,0], "Hai già guarito una persona durante la partita", message.channel);
				return;
			
			}else{

				for(let i = 0; i < moderatore.playerDying.length; i += 1){//searching for the healed
					if(mentioned === moderatore.playerDying[i]){
						let index = moderatore.playerList.get(moderatore.playerDying[i]).tratto.indexOf('mangiato');
						if(index !== -1)
							moderatore.playerList.get(moderatore.playerDying[i]).tratto.splice(index, 1);
						
						moderatore.playerDying.splice(i,1);

						moderatore.playerList.get(message.member).tratto.push('usato');
						embed.sendEmbed([149,193,255], `Hai guarito ${mentioned.toString()}`, message.channel);
						return;
					}
				}

				embed.sendEmbed([255,0,0], "La persona indicata non sta morendo.", message.channel);
				return;
			}

		}else{
			message.delete();
			embed.sendEmbed([255,0,0], "Non hai il ruolo adatto per guarire.", message.author);
		}
	}
}