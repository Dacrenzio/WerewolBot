module.exports ={
	name: 'protect',
	description: "this command allows the witch to protect 1 player",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const f = require("../figures.js");

		if(moderatore.playerNum < 6 || moderatore.playerList.size < moderatore.playerNum){
			embed.sendEmbed([255,0,0], "Mancano dei giocatori o non è stato iniziato un nuovo gioco.", message.channel);
			return;
		}
		if(!moderatore.playerList.has(message.member)){
			embed.sendEmbed([255,0,0], "Devi essere in gioco per poter eseguire i comandi.", message.channel);
			return;
		}
		

		if(message.mentions.members.array().length !== 1){
			embed.sendEmbed([255,0,0], "Citare una persona da guardare", message.channel);
			return;
		}
		if(message.mentions.members.first() === message.member){
			embed.sendEmbed([255,0,0], "Non puoi proteggere te stessa!", message.channel);
			return;
		}

		
		let mentioned = message.mentions.members.first();

		if(!moderatore.playerList.has(mentioned)){
			embed.sendEmbed([255,0,0], "Citare una persona in gioco.", message.channel);
			return;
		}


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