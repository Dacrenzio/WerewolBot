module.exports={
	name: 'heal',
	description: "let the Healer to heal a Dying player",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const f = require("../figures.js");

		if(moderatore.playerNum < 6 || moderatore.playerList.size < moderatore.playerNum){
			embed.sendEmbed([255,0,0], "Mancano dei giocatori o non è stato iniziato un nuovo gioco.", message.channel);
			return;
		}

		if(message.mentions.members.array().length !== 1){
			embed.sendEmbed([255,0,0], "Citare una persona da guarire", message.channel);
			return;
		}

		if(message.mentions.members.first() === message.member){
			embed.sendEmbed([255,0,0], "Non puoi proteggere te stessa!", message.channel);
			return;
		}

		if(!moderatore.playerList.has(message.member)){
			embed.sendEmbed([255,0,0], "Devi essere in gioco per poter eseguire i comandi.", message.channel);
			return;
		}
		
		let mentioned = message.mentions.members.first();

		if(!moderatore.playerList.has(mentioned)){
			embed.sendEmbed([255,0,0], "Citare una persona in gioco.", message.channel);
			return;
		}

		let caller = moderatore.playerList.get(message.member);

		if(caller.id === f.guaritore && caller.alive){

			if(caller.tratto.includes('usato')){
				embed.sendEmbed([255,0,0], "Hai già guarito una persona durante la partita", message.channel);
				return;
			
			}else{

				for(let i = 0; i < moderatore.playerDying.length; i += 1){//searching for the healed
					if(mentioned === moderatore.playerDying[i]){
						embed.sendEmbed([149,193,255], `Hai guarito ${moderatore.playerDying[j].toString()}`, message.channel);
						moderatore.playerDying.splice(j,1);
						caller.tratto.push('usato');
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