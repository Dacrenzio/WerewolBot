module.exports = {
	name: 'day',
	description: "unmute all the people, check if the ",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const fin = require("../functions/victory.js");
		const unMute = require('./unmuteall.js');
		const slay = require('../functions/slay.js');
		const gameOver = require('../functions/gameOver.js');
		const f = require("../figures.js");

		if(moderatore.playerNum < 6 || moderatore.playerList.size < moderatore.playerNum){
			embed.sendEmbed([255,0,0], "Mancano dei giocatori o non è stato iniziato un nuovo gioco.", message.channel);
			return;
		}

		if(moderatore.nightOrder.length != 0){
			embed.sendEmbed([255,0,0], "Impossibile far salire il giorno con ruoli ancora da eseguire", message.channel);
			return;
		}

		//unmuting people
		if(message.member.voice.channel == null){
			embed.sendEmbed([255,0,0], "Devi essere in una chat vocale per far salire il giorno!", message.channel);
			return;
		}
		unMute.execute(message);
		

		//killing people died during night
		let deadPeople = "";
		moderatore.playerDying.forEach(member =>{
			if(moderatore.playerList.get(member).id === 13){//attivazione del pazzo
				for(let player of moderatore.playerList.entries()){
					if(player[1].id === f.capoBranco || player[1].id === f.lupoDelBranco){
						moderatore.playerList.get(player[0]).tratto.push('pazzo');
					}
				}
			}
			
			slay.execute(message, moderatore, member, 'mangiato');
			deadPeople += member.toString() + " è morto durante la notte.\n";
		});

		if(deadPeople.valueOf() === ""){
			deadPeople = "Nessuno è morto stanotte";
		}
		embed.sendEmbed([149, 193, 255], deadPeople, message.channel);

		//checking if the game is over
		gameOver.execute(message, message.channel, moderatore);
		if(fin.victory(moderatore)[0]){
			return;
		}


		//controlling bard and Oste
		let isBardIn = moderatore.roleListID.includes(f.bard);
		let isOsteIn = moderatore.roleListID.includes(f.oste);
		if(isBardIn || isOsteIn){
			let foundAliveBard = false;
			let foundAliveOste = false;
			let isVeggenteAlive = false;


			for(let player of moderatore.playerList.entries()){
				if(player[1].id === f.bard && player[1].alive){
					foundAliveBard = true;
				}

				if(player[1].id === f.oste && player[1].alive){
					foundAliveOste = true;
				}

				if(player[1].id === f.veggente &&
				(player[1].alive || moderatore.playerDying.includes(player[0]))){
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

		//togliendo la protezione della strega
		for(let player of moderatore.playerList.entries()){
			if(player[1].tratto.includes('protetto') && player[1].id !== f.eremita){
				let index = player[1].tratto.indexOf('protetto');
				moderatore.playerList.get(player[0]).tratto.splice(index, 1);
				break;
			}
		}

		embed.sendEmbed([149, 193, 255], "Iniziare le votazioni con `-startVotation`.", message.channel);
	}
}