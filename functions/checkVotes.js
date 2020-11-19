module.exports = {
	execute(message, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const gameOver = require("../functions/gameOver.js");
		const slay = require('./slay.js');

		let channel = message.guild.channels.cache.find(c => c.name === 'generale');

		if(moderatore.ballottaggio.length > 0){
			if(moderatore.ballottaggio.length === moderatore.playerList.size - moderatore.numberOfDeadPlayer){
				
				embed.sendEmbed([149, 193, 255], "Votazione annullata", channel);
				moderatore.burnedPlayer = null;
				moderatore.ballottaggio = [];
				return;
			}

			if(moderatore.burnedPlayer !== null && 
			moderatore.playerList.get(moderatore.burnedPlayer).id === 6){//check giullare
				
				embed.sendEmbed([149, 193, 255], "Votazione annullata", channel);
				moderatore.burnedPlayer = null;
				moderatore.ballottaggio = [];
				return;
			}
	

			let index = -1;
			let burning = -1;
			let even = -1;

			for(let i = 0; i < moderatore.ballottaggio.length; i += 1){
				
				if(moderatore.playerList.get(moderatore.ballottaggio[i]).votes.length >= burning){
				even = burning;
				burning = moderatore.playerList.get(moderatore.ballottaggio[i]).votes.length;
				index = i;
				}
			}
			
			if(burning === even){
				embed.sendEmbed([149, 193, 255], "Votazione annullata", channel);
				moderatore.burnedPlayer = null;
				moderatore.ballottaggio = [];
				return;

			}else{
				embed.sendEmbed([149, 193, 255], `Il rogo di stasera brucia ${moderatore.ballottaggio[index].toString()}`, channel);
				moderatore.burnedPlayer = moderatore.ballottaggio[index];
				slay.execute(message, moderatore, moderatore.burnedPlayer, 'bruciato');

				moderatore.ballottaggio = [];

				//check game over
				gameOver.execute(message, channel, moderatore);
				return;
			}


		}else{//se non siamo nel ballottaggio
			let playerBurn = null;
			let burning = -1;
			let even = -1;

			for(let player of moderatore.playerList.entries()){//cerca i due voti piu alti
				if(player[1].votes.length > burning){
					even = burning;
					burning = player[1].votes.length;
					playerBurn = player[0];

				} else if(player[1].votes.length > even){
					even = player[1].votes.length;
				}
			}

			if(burning >= moderatore.playerList.size - moderatore.numberOfDeadPlayer - 1){//se e stata votata una sola persona
				if(moderatore.burnedPlayer != null && 
				moderatore.playerList.get(moderatore.burnedPlayer).id === 6){
					
					embed.sendEmbed([149, 193, 255], "Votazione annullata", channel);
					moderatore.burnedPlayer = null;
					return;
				}

				embed.sendEmbed([149, 193, 255], `Il rogo di stasera brucia ${playerBurn.toString()}`, channel);
				moderatore.burnedPlayer = playerBurn;
				slay.execute(message, moderatore, moderatore.burnedPlayer, 'bruciato');


				//check if game over
				gameOver.execute(message, channel, moderatore);
				return;
			}

			let nominati = "";
			for(let entrie of moderatore.playerList.entries()){
				if(entrie[1].votes.length === burning || entrie[1].votes.length === even){
					moderatore.ballottaggio.push(entrie[0]);
					nominati += `${entrie[0].toString()}\n`;
				}
			}
			embed.sendEmbed([149, 193, 255], nominati+ "Sono chiamati al ballottaggio.", channel);
		}
	}
}