module.exports = {
	name: 'next',
	description: "this metod call the next figure that has to play and gives the respective role to the player",
	execute(message, args, moderatore){
		let embed = require("../functions/sendEmbed.js");


		let role = message.guild.roles.cache.find(r => r.name === "Uomini");//rimuovo il ruolo Uomini a tutti coloro che lo hanno
		role.members.each(member => member.roles.remove(role));

		role = message.guild.roles.cache.find(r => r.name === "Lupi");//stessa cosa lupi
		role.members.each(member => member.roles.remove(role));

		role = message.guild.roles.cache.find(r => r.name === "Criminali");// stessa cosa criminali
		role.members.each(member => member.roles.remove(role));

		
		if(moderatore.nightOrder.length === 0){
			embed.sendEmbed([149,193,255], "Ruoli terminati, iniziare il giorno con `-day`", message.channel);
			return;
		}


		let roleID = moderatore.nightOrder.shift();//faccio venire il prossimo ruolo che deve giocare
		while(!moderatore.roleListID.includes(roleID)){
			if(moderatore.nightOrder.length === 0){
				embed.sendEmbed([0,255,0], "Ruoli terminati, iniziare il giorno con `-day`", message.channel);
				return;
			}
			
			roleID = moderatore.nightOrder.shift();
		}

		let lupi = "";
		for(let entrie of moderatore.playerList.keys()){
			if((moderatore.playerList.get(entrie).id === roleID) ||
				(roleID === 2 && moderatore.playerList.get(entrie).id === 5) ||
				(roleID === 2 && moderatore.playerList.get(entrie).id === 8) ||
				(roleID === 2 && moderatore.playerList.get(entrie).id === 17 && moderatore.nightNum === 1)){
				switch(roleID){
					case 7://guaritore
						if(moderatore.playerList.get(entrie).tratto.includes('usato')){
							return;
						}

						let morenti = "";
						moderatore.playerDying.forEach(player=> morenti += `${player.toString()} sta morendo\n`);
						if(morenti.valueOf() === ""){
							morenti = "Nessuno sta morendo.";
						}
						
						setTimeout(()=>{
							let channel = message.guild.channels.cache.find(r => r.name === "uomini");
							embed.sendEmbed([149,193,255], morenti, channel);
						}, 2000);
						
					case 9://mago
					case 10://medium
					case 16://strega
					case 18://veggente
						role = message.guild.roles.cache.find(r => r.name === "Uomini");
						entrie.roles.add(role).catch(console.error);
						embed.sendEmbed([149,193,255], `${componi(roleID)[0]} è il tuo turno${componi(roleID)[1]}`, message.channel);
						return;


					case 2://lupi
						if(moderatore.nightNum === 1){
							if(moderatore.playerList.get(entrie).id === 2){
								lupi += `${entrie.toString()} è il Capo Branco\n`;
							} else if(moderatore.playerList.get(entrie).id === 8){
								lupi += `${entrie.toString()} è un Lupo del Branco\n`;
							}else if (moderatore.playerList.get(entrie).id === 5){
								lupi += `${entrie.toString()} è il Giovane Lupo\n`;
							} else{
								lupi += `${entrie.toString()} è il Traditore\n`;
								break;
							}
						}

						role = message.guild.roles.cache.find(r => r.name === "Lupi");
						entrie.roles.add(role).catch(console.error);
						break;


					case 11://monaco
						let presentRole = moderatore.roleListID.slice();
						for(let entrie2 of moderatore.playerList.keys()){//sottraggo i ruoli presenti
							
							let indexOf = presentRole.indexOf(moderatore.playerList.get(entrie2).id);
							while(indexOf != -1){//tolgo tutti i ruoli di quel tipo
								presentRole.splice(indexOf, 1);
								indexOf = presentRole.indexOf(moderatore.playerList.get(entrie2).id);
							}
						}

						if(presentRole.length === 0){//controllo se siano rimasti ruoli
							embed.sendEmbed([149,193,255], "Tutti i ruoli sono in partita", entrie);
							break;
						}

						let ruoliNonPresenti = "";
						let extracted = -1;
						for(let j = 0; j < 2 && j < presentRole.length; j+= 1){//estraggo 2 o meno ruoli casuali
							let ran = Math.floor(Math.random() * presentRole.length);
							
							while(ran === extracted){
								ran = Math.floor(Math.random() * presentRole.length);
							}

							ruoliNonPresenti += componi(presentRole[ran])[0] + "\n";

							if(j === 0){
								let extracted = ran;
							}
						}

						embed.sendEmbed([149,193,255], ruoliNonPresenti, entrie);
					
						break;
					
					
					case 15://prete
						for(let entrie2 of moderatore.playerList.keys()){
							if(moderatore.playerList.get(entrie2).id === 14){
								embed.sendEmbed([149,193,255], `${entrie2.toString()} è il Peccatore`, entrie);
								break;
							}
						}
						embed.sendEmbed([149,193,255], "Il Peccatore non è in gioco", entrie);
						break;
				}
			}
		}

		if(moderatore.nightNum === 1 && roleID === 2){
			setTimeout(()=>{
				let channel = message.guild.channels.cache.find(r => r.name === "lupi");
				embed.sendEmbed([149,193,255], lupi, channel);
			}, 3000);
		}

		embed.sendEmbed([149,193,255], `${componi(roleID)[0]} è il tuo turno${componi(roleID)[1]}`, message.channel);
	}
}



function componi(id){
	switch(id){
		case 1: return ["Il Bardo", "\n"];
		case 2: return ["Il Branco", ", comando: `-kill @objective`\n"];
		case 3: return ["Il Contadino", "\n"];
		case 4: return ["L'Eremita", "\n"];
		case 5: return ["Il Giovane Lupo" , "\n"];
		case 6: return ["Il Giullare", "\n"];
		case 7: return ["Il Guaritore", ", comando: `-heal @objective`\n"];
		case 8: return ["Il Lupo del Branco", "\n"];
		case 9: return ["Il Mago", ", comando: `-mistic @objective`\n"];
		case 10: return ["Il Medium" , ", comando: `-aura @objective`\n"];
		case 11: return ["Il Monaco" , "\n"];
		case 12: return ["L'Oste", "\n"];
		case 13: return ["Il Pazzo", "\n"];
		case 14: return ["Il Peccatore", "\n"];
		case 15: return ["Il Prete", "\n"];
		case 16: return ["La Strega", ", comando: `-protect @objective`\n"];
		case 17: return ["Il Traditore", "\n"];
		case 18: return ["La Veggente", ", comando: `-aura @objective`\n"];
	}
}