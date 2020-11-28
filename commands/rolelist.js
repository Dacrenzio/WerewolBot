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
		case 1: return "Il Bardo";
		case 2: return "Il Branco";
		case 3: return "Il Contadino";
		case 4: return "L'Eremita";
		case 5: return "Il Giovane Lupo";
		case 6: return "Il Giullare";
		case 7: return "Il Guaritore";
		case 8: return "Il Lupo del Branco";
		case 9: return "Il Mago";
		case 10: return "La Medium";
		case 11: return "Il Monaco";
		case 12: return "L'Oste";
		case 13: return "Il Pazzo";
		case 14: return "Il Peccatore";
		case 15: return "Il Prete";
		case 16: return "La Strega";
		case 17: return "Il Traditore";
		case 18: return "La Veggente";
		case 19: return "L'angelo custode";
	}
}