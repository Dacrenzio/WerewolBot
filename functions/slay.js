module.exports ={
	execute(message, moderatore, member, motivo){
		moderatore.playerList.get(member).alive = false;
		moderatore.playerList.get(member).tratto.push(motivo);
		moderatore.numberOfDeadPlayer += 1;

		let ghostRole = message.guild.roles.cache.find(r => r.name === "Ghost");
		member.roles.add(ghostRole).catch(console.error);
	}
}