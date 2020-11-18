module.exports = {
	name: 'vote',
	description: "this command allows player to vote someone",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		let mentionedArray= message.mentions.members.array();

		if(message.channel.name.valueOf() !== message.member.user.username.valueOf()){
			message.delete();
			embed.sendEmbed([255, 0, 0], "Hai mandato il voto nella chat sbagliata!", message.channel);
			return;
		}

		if(mentionedArray.length !== 1){//if they call more or less then 1 people
			embed.sendEmbed([255,0,0], "Citare una persona da votare", message.channel);
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

		if(moderatore.ballottaggio.length > 0 && !moderatore.ballottaggio.includes(mentioned)){
			embed.sendEmbed([255, 0, 0], "Hai votato una persona che non è in ballottaggio!", message.channel);
			return;
		}

		moderatore.playerList.get(mentioned).votes.push(message.member);
		moderatore.numberOfVotes += 1;
		embed.sendEmbed([0, 255, 0], "Il tuo voto è stato accettato!", message.member);
		

		if(moderatore.numberOfVotes === moderatore.playerList.size - moderatore.numberOfDeadPlayer - moderatore.ballottaggio.length){
			let channel = message.guild.channels.cache.find(c => c.name === 'Generale');

			if(moderatore.ballottaggio.length > 0){
				if(moderatpre.playerList.get(moderatore.burnedPlayer).id === 6){
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
					moderatore.playerList.get(moderatore.ballottaggio[index]).alive = false;
					moderatore.playerList.get(moderatore.ballottaggio[index]).tratto.push('bruciato');
					moderatore.burnedPlayer = moderatore.ballottaggio[index];
					moderatore.numberOfDeadPlayer += 1;
					moderatore.ballottaggio = [];

					//check game over
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
						embed.sendEmbed([149,193,255], mess, message.channel);


						let ghostRole = message.guild.roles.cache.find(r => r.name === "Ghost");
						let modRole = message.guild.roles.cache.find(r => r.name === "Moderatore");
						message.guild.members.cache.each(member => member.roles.remove([ghostRole, modRole]));
						return;
					}
					return;
				}


			}else{
				let playerBurn = null;
				let burning = -1;
				let even = -1;

				for(let player of moderatore.playerList.entries()){
					if(player[1].votes.length > burning){
						even = burning;
						burning = player[1].votes.length;
						playerBurn = player[0];

					} else if(player[1].votes.length > even){
						even = player[1].votes.length;
					}
				}

				if(burning >= moderatore.playerList.size - moderatore.numberOfDeadPlayer -1){
					if(moderatpre.playerList.get(moderatore.burnedPlayer).id === 6){
						embed.sendEmbed([149, 193, 255], "Votazione annullata", channel);
						moderatore.burnedPlayer = null;
						return;
					}
					embed.sendEmbed([149, 193, 255], `Il rogo di stasera brucia ${playerBurn.toString()}`, channel);
					moderatore.playerList.get(playerBurn).alive = false;
					moderatore.playerList.get(playerBurn).tratto.push('bruciato');
					moderatore.burnedPlayer = playerBurn;
					moderatore.numberOfDeadPlayer += 1;


					//check if game over
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
						embed.sendEmbed([149,193,255], mess, message.channel);

						moderatore.playerNum = -1;
						moderatore.playerList.clear();

						let ghostRole = message.guild.roles.cache.find(r => r.name === "Ghost");
						let modRole = message.guild.roles.cache.find(r => r.name === "Moderatore");
						message.guild.members.cache.each(member => member.roles.remove([ghostRole, modRole]));
						return;
					}
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

		message.channel.delete();
	}
}