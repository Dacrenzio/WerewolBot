module.exports = {
	name: 'chooserole',
	description: "this command adds the chosen roles to the game",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const random = require("../functions/randomPick.js");
		const assign = require("../functions/assignParameters.js");

		if(moderatore.playerNum < 6 || moderatore.playerList.size < moderatore.playerNum){
			embed.sendEmbed([255,0,0], "Mancano dei giocatori o non è stato iniziato un nuovo gioco.", message.channel);
			return;
		}
		
		if(args.length < moderatore.playerNum -2){
			embed.sendEmbed([255,0,0], "Inseriti troppi pochi ruoli!", message.channel);
			return;
		}

		if(args.length > moderatore.playerNum*1.5 -2){
			embed.sendEmbed([255,0,0], "Inseriti troppi ruoli!", message.channel);
			return;
		}

		//inserisco i ruoli possibili nella lista
		args.forEach(element=> moderatore.roleListID.push(parseInt(element)));

		embed.sendEmbed([149,193,255], "Estrazione a sorte dei ruoli in corso...", message.channel);

		random.execute(moderatore, message);
		assign.execute(moderatore);

		embed.sendEmbed([0,255,0], "Ruoli estratti correttamente, scrivere `-night` per inizializzare la notte ```oppure -reRoll per rieseguire l'estrazione dei ruoli.```", message.channel);
	}
}