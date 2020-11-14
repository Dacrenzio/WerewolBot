module.exports = {
	name:'reroll',
	description: 'reroll the random roles and send the list to the moderator',
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const random = require("../functions/randomPick.js");
		const assign = require("../functions/assignParameters.js");

		embed.sendEmbed([149,193,255], "Ritiro a sorte dei ruoli in corso...", message.channel);

		random.execute(moderatore, message);
		assign.execute(moderatore);

		embed.sendEmbed([0,255,0], "Ruoli riestratti correttamente, scrivere `-night` per inizializzare la notte \n```oppure -reRoll per rieseguire l'estrazione dei ruoli.```", message.channel);
	}
}