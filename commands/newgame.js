module.exports = {
	name: 'newgame',
	description: "this command starts a new game of n people and assign the role ''moderator'' to the caller",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		let err = require("../functions/errors");

		if(args.length !== 1){
			embed.sendEmbed([255,0,0], "Scrivere anche il numero di giocatori.", message.channel);
			return;
		}

		
		if(err.errors([6], moderatore, message))return;

		
		if(parseInt(args[0]) < 6){
			embed.sendEmbed([255,0,0], "Siete in pochi per giocare!", message.channel);
			return;
		}

		let role = message.guild.roles.cache.find(r => r.name === "Moderatore");
		role.members.each(member => member.roles.remove(role));

		message.member.roles.add(role).catch(console.error);

		embed.sendEmbed([149,193,255], "Creato nuovo game, gli utenti che intendono giocare scrivano `-join`", message.channel);

		moderatore.nightNum = 0;
		moderatore.playerNum = parseInt(args[0]);
		moderatore.auraType = false;
		moderatore.playerList= new Map();
		moderatore.playerDying = [];
		moderatore.roleListID = [2, 18];
		moderatore.nightOrder = [];
		moderatore.burnedPlayer = null;
		moderatore.numberOfVotes = 0;
		moderatore.ballottaggio = [];
		moderatore.numberOfDeadPlayer = 0;
		moderatore.finished = false;
	}
}