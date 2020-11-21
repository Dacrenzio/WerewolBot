module.exports = {
	monaco(moderatore){
		const embed = require('./sendEmbed.js');

		let mon;
		let presentRole = moderatore.roleListID.slice();
		for(let player of moderatore.playerList.entries()){//sottraggo i ruoli presenti
			if(player[1].id == 11){
				mon = player[0];
			}
			let indexOf = presentRole.indexOf(player[1].id);
			while(indexOf != -1){//tolgo tutti i ruoli di quel tipo
				presentRole.splice(indexOf, 1);
				indexOf = presentRole.indexOf(player[1].id);
			}
		}

		if(presentRole.length === 0){//controllo se siano rimasti ruoli
			embed.sendEmbed([149,193,255], "Tutti i ruoli sono in partita", mon);
			break;
		}

		let ruoliNonPresenti = "";
		let extracted = -1;
		for(let j = 0; j < 2 && j < presentRole.length; j += 1){//estraggo 2 o meno ruoli casuali
			let ran = Math.floor(Math.random() * presentRole.length);
			
			while(ran === extracted){
				ran = Math.floor(Math.random() * presentRole.length);
			}

			ruoliNonPresenti += componi(presentRole[ran])[0] + "\n";

			if(j === 0){
				let extracted = ran;
			}
		}

		embed.sendEmbed([149,193,255], ruoliNonPresenti, mon);

	}
}