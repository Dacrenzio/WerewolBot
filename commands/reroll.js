module.exports = {
	name:'reroll',
	description: 'reroll the random roles and send the list to the moderator',
	async execute(message, args, moderatore, auto){
		const embed = require("../functions/sendEmbed.js");
		const random = require("../functions/randomPick.js");
		const assign = require("../functions/assignParameters.js");
		let err = require("../functions/errors");

		if(err.errors([0], moderatore, message))return;

		if(moderatore.playerList.size > moderatore.roleListID.length){
			embed.sendEmbed([255,0,0], "Devi prima scegliere i ruoli con `-chooseRole`");
			return;
		}

		embed.sendEmbed([149,193,255], "Ritiro a sorte dei ruoli in corso...", message.channel);

		//resetting player
		moderatore.nightNum = 0;
		moderatore.auraType = false;
		moderatore.playerDying = [];
		moderatore.nightOrder = [];
		moderatore.burnedPlayer = null;
		moderatore.numberOfVotes = 0;
		moderatore.ballottaggio = [];
		moderatore.numberOfDeadPlayer = 0;
		moderatore.finished = false;

		await message.guild.members.fetch();
		let ghostRole = message.guild.roles.cache.find(r => r.name === "Ghost");
		for(i = 0; i < ghostRole.members.array().length; i++) {
			await ghostRole.members.array()[i].roles.remove(ghostRole);
		}
		await message.guild.members.fetch();

		random.execute(moderatore, message, auto);
		assign.execute(moderatore);

		

		embed.sendEmbed([0,255,0], "Ruoli riestratti correttamente, scrivere `-night` per inizializzare la notte \n```oppure -reRoll per rieseguire l'estrazione dei ruoli.```", message.channel);
	}
}