module.exports = {
	name: 'day',
	description: "unmute all the people, check if the ",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const unMute = require('./unmuteall.js');
		const slay = require('../functions/slay.js');
		const gameOver = require('../functions/gameOver.js');
		const f = require("../figures.js");
		let err = require("../functions/errors");
		const osteria = require("../functions/osteria.js");

		if(err.errors([0,5,4,8], moderatore, message))return;

		//unmuting people
		unMute.execute(message, args, moderatore);
		message.member.voice.channel.leave();
		

		//killing people died during night
		let deadPeople = "";
		moderatore.playerDying.forEach(member =>{
			if(moderatore.playerList.get(member).id === f.pazzo && moderatore.playerList.get(member).tratto.includes('mangiato')){//attivazione del pazzo
				for(let player of moderatore.playerList.entries()){
					if(player[1].id === f.capoBranco || player[1].id === f.lupoDelBranco){
						moderatore.playerList.get(player[0]).tratto.push('pazzo');
					}
				}
			}
			
			slay.execute(message, moderatore, member);
			deadPeople += member.toString() + " è morto durante la notte.\n";
		});

		if(deadPeople.valueOf() === ""){
			deadPeople = "Nessuno è morto stanotte";
		}
		embed.sendEmbed([149, 193, 255], deadPeople, message.channel);

		//checking if the game is over
		if(gameOver.execute(message, message.channel, moderatore))return;

		
		//controlling bard and Oste
		osteria.sing(moderatore, message);


		
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