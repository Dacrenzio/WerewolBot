module.exports={
	name: 'rolelist',
	description: "returns the role list",
	execute(message,args,moderatore){
		const embed = require("../functions/sendEmbed.js");
		const err = require("../functions/errors");

		if(err.errors([0], moderatore, message))return;

		let listRole = "";
		moderatore.roleListID.forEach(role => {
			listRole += componi(role) +'\n';
		});

		embed.sendEmbed([149,193,255], listRole, message.channel);
	}
}

function componi(id){
	switch(id){
		case 1: return "Bardo";
		case 2: return "Branco";
		case 3: return "Contadino";
		case 4: return "Eremita";
		case 5: return "Giovane Lupo";
		case 6: return "Giullare";
		case 7: return "Guaritore";
		case 8: return "Lupo del Branco";
		case 9: return "Mago";
		case 10: return "Medium";
		case 11: return "Monaco";
		case 12: return "Oste";
		case 13: return "Pazzo";
		case 14: return "Peccatore";
		case 15: return "Prete";
		case 16: return "Strega";
		case 17: return "Traditore";
		case 18: return "Veggente";
		case 19: return "Angelo Custode";
	}
}