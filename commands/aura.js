module.exports = {
	name: 'aura',
	description: "this command is used by roleID: 18 Veggente, says to the player if the Aura is dark (true) or white (false)",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const f = require("../figures.js");

		if(message.mentions.members.array().length !== 1){
			embed.sendEmbed([255,0,0], "Citare una persona da guardare.", message.channel);
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
		let called = moderatore.playerList.get(mentioned);

		if((caller.id === f.veggente || caller.id === f.medium) && caller.alive){ //check if he's roleID: 18
					
					
			if((!called.alive && caller.id === f.veggente) ||
			(called.alive && caller.id === f.medium)){ //check if the numbe 18 is checking someone alive and number 10 someone dead
				
				embed.sendEmbed([255,0,0], "Hai controllato un giocatore morto (se sei la Veggente) o vivo (se sei la Medium)", message.channel);
				return;
			}

			if(called.aura){
				embed.sendEmbed([149,193,255], `${mentioned.toString()} ha un'aura Oscura`, message.channel);
				if(caller.id === f.veggente)
					moderatore.auraType = true;
			}else{
				embed.sendEmbed([149,193,255], `${mentioned.toString()} ha un'aura Chiara`, message.channel);
				if(caller.id === f.veggente)
					moderatore.auraType = false;
			}
			return;
		
		}else{
			message.delete();
			embed.sendEmbed([255,0,0], "Non hai il ruolo adatto per guardare le anime altrui.", message.author);
		}	
	}
}