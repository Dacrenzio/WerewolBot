module.exports ={
	execute(message, moderatore, member){
		moderatore.playerList.get(member).alive = false;
		moderatore.numberOfDeadPlayer += 1;

		let ghostRole = message.guild.roles.cache.find(r => r.name === "Ghost");
		member.roles.add(ghostRole).catch(console.error);
	}
}