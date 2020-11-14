module.exports = {
	name: 'day',
	description: "unmute",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const fin = require("../functions/victory.js");

		if(moderatore.nightOrder.length != 0){
			embed.sendEmbed([255,0,0], "Impossibile far salire il giorno con ruoli ancora da eseguire", message.channel);
			return;
		}

		//unmuting people
		let channel = message.member.voice.channel;
		let bot = message.guild.roles.cache.find(r => r.name === "WereBot").members;
		channel.members.difference(bot).each(member => member.voice.setMute(false).catch(console.log));
		channel.leave();
		

		//killing people died during night
		let deadPeople = "";
		moderatore.playerDying.forEach(member =>{
			if(moderatore.playerList.get(member).id === 13){//attivazione del pazzo
				for(let entrie of moderatore.playerList.keys()){
					if(moderatore.playerList.get(entrie).id === 2 || moderatore.playerList.get(entrie).id === 5){
						moderatore.playerList.get(entrie).tratto.push('pazzo');
					}
				}
			}
			moderatore.playerList.get(member).alive = false;
			moderatore.playerList.get(member).tratto.push('mangiato');
			moderatore.numberOfDeadPlayer += 1;

			let ghostRole = message.guild.roles.cache.find(r => r.name === "Ghost");
			member.roles.add(ghostRole).catch(console.error);

			deadPeople += member.toString() + " è morto durante la notte.\n";
		});

		if(deadPeople.valueOf() === ""){
			deadPeople = "Nessuno è morto stanotte";
		}
		embed.sendEmbed([149, 193, 255], deadPeople, message.channel);

		//checking if the game is over
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


		//controlling bard and Oste
		let isBardIn = moderatore.roleListID.includes(1);
		let isOsteIn = moderatore.roleListID.includes(10);
		if(isBardIn || isOsteIn){
			let foundAliveBard = false;
			let foundAliveOste = false;
			let isVeggenteAlive = false;


			for(let entries of moderatore.playerList.keys()){
				if(moderatore.playerList.get(entries).id === 1 && moderatore.playerList.get(entries).alive){
					foundAliveBard = true;
				}

				if(moderatore.playerList.get(entries).id === 12 && moderatore.playerList.get(entries).alive){
					foundAliveOste = true;
				}

				if(moderatore.playerList.get(entries).id === 18 &&
				(moderatore.playerList.get(entries).alive || moderatore.playerDying.includes(entries.key))){
					isVeggenteAlive = true;
				}
			}

			if(!isVeggenteAlive){
				embed.sendEmbed([149, 193, 255], "Non giungono notizie dall'Osteria.", message.channel);
			}

			if(isBardIn && isVeggenteAlive){//if there's bardo
				if(isOsteIn){ //and oste
					if(foundAliveBard && !moderatore.auraType){ //check if bardo is alive and that the aura is clear
						embed.sendEmbed([149, 193, 255], "Fu trovata un'anima Pura.", message.channel);
					} else if(foundAliveOste && moderatore.auraType){ //else check if the Oste is alive and the aura is dark
						embed.sendEmbed([149, 193, 255], "Fu trovata un'anima Impura.", message.channel);
					} else{ //if they' both dead or not in play or the one alive has negative result, say nothing
						embed.sendEmbed([149, 193, 255], "Non giungono notizie dall'Osteria.", message.channel);
					}
				} else { //id there's only bard
					if(foundAliveBard && !moderatore.auraType){//check bard conditions
						embed.sendEmbed([149, 193, 255], "Fu trovata un'anima Pura.", message.channel);
					} else{
						embed.sendEmbed([149, 193, 255], "Non giungono notizie dall'Osteria.", message.channel);
					}
				}
			} else if(isOsteIn && isVeggenteAlive){//if there's only the Oste
				if(foundAliveOste && moderatore.auraType){ //check Oste condition
					embed.sendEmbed([149, 193, 255], "Fu trovata un'anima Impura.", message.channel);
				} else{
					embed.sendEmbed([149, 193, 255], "Non giungono notizie dall'Osteria.", message.channel);
				}
			}
		}

		//cleaning the dead body
		moderatore.playerDying = [];
	}
}