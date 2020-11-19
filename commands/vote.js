module.exports = {
	name: 'vote',
	description: "this command allows player to vote someone",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const check = require("../functions/checkVotes.js");
		
		let mentionedArray= message.mentions.members.array();

		if(message.channel.name.valueOf() !== message.member.user.id.valueOf()){
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
			check.execute(message,moderatore);
		}
		message.channel.delete();
	}
}