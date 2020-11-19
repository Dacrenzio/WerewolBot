module.exports = {
	name: 'mistic',
	description: "says if the mentioned player is a mistic",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const f = require("../figures.js");
		let err = require("../functions/errors");

		if(err.errors([0,2,1,3,7], moderatore, message))return;

		let caller = moderatore.playerList.get(message.member);

		if(caller.id === f.mago && caller.alive){ //check if he's roleID: 9 and alive

			if(moderatore.playerList.get(mentioned).misticismo){
				embed.sendEmbed([149,193,255], `${mentioned.toString()} è un mistico`, message.channel);
			}else{
				embed.sendEmbed([149,193,255], `${mentioned.toString()} non è un mistico`, message.channel);
			}
			
		}else{
			message.delete();
			embed.sendEmbed([255,0,0], "Non hai il ruolo adatto per guardare le capacità altrui.", message.author);
		}
	}
}