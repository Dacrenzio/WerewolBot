module.exports = {
	name: 'chooserole',
	description: "this command adds the chosen roles to the game",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const random = require("../functions/randomPick.js");
		const assign = require("../functions/assignParameters.js");
		let err = require("../functions/errors");

		if(err.errors([0,6], moderatore, message))return;

		
		if(args.length < moderatore.playerNum -2){
			embed.sendEmbed([255,0,0], "Inseriti troppi pochi ruoli!", message.channel);
			return;
		}

		if(args.length > moderatore.playerNum*1.5 -2){
			embed.sendEmbed([255,0,0], "Inseriti troppi ruoli!", message.channel);
			return;
		}

		moderatore.roleListID = [];
		//inserisco i ruoli possibili nella lista
		args.forEach(element=> moderatore.roleListID.push(parseInt(element)));

		embed.sendEmbed([149,193,255], "Estrazione a sorte dei ruoli in corso...", message.channel);

		random.execute(moderatore, message);
		assign.execute(moderatore);

		embed.sendEmbed([0,255,0], "Ruoli estratti correttamente, scrivere `-night` per inizializzare la notte ```oppure -reRoll per rieseguire l'estrazione dei ruoli.```", message.channel);
	}
}