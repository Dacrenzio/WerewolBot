module.exports = {
	name: 'mistic',
	description: "says if the mentioned player is a mistic",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const f = require("../figures.js");

		if(message.mentions.members.array().length !== 1){
			embed.sendEmbed([255,0,0], "Citare una persona da guardare", message.channel);
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

		if(caller.id === f.mago && caller.alive){ //check if he's roleID: 9 and alive

			if(moderatore.playerList.get(mentioned).misticismo){
				embed.sendEmbed([149,193,255], `${mentioned.toString()} è un mistico`, message.channel);
			}else{
				embed.sendEmbed([149,193,255], `${mentioned.toString()} non è un mistico`, message.channel);
			}
			
		}else{
			message.delete();
			embed.sendEmbed([255,0,0], "Non hai il ruolo adatto per guardare le capacità altrui.", message.author);
		}
	}
}