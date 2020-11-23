module.exports = {
	name: 'next',
	description: "this metod call the next figure that has to play and gives the respective role to the player",
	execute(message, args, moderatore, auto){
		const embed = require("../functions/sendEmbed.js");
		const f = require("../figures.js");
		const err = require("../functions/errors");
		const recursive = require("./next.js");
		const mon = require('../functions/monaco.js');


		let role = message.guild.roles.cache.find(r => r.name === "Uomini");//rimuovo il ruolo Uomini a tutti coloro che lo hanno
		role.members.each(member => member.roles.remove(role));

		role = message.guild.roles.cache.find(r => r.name === "Lupi");//stessa cosa lupi
		role.members.each(member => member.roles.remove(role));

		role = message.guild.roles.cache.find(r => r.name === "Criminali");// stessa cosa criminali
		role.members.each(member => member.roles.remove(role));
		
		if(err.errors([0, 8], moderatore, message))return;

		let general = message.guild.channels.cache.find(c => c.name === 'generale');

		
		if(moderatore.nightOrder.length === 0){
			embed.sendEmbed([149,193,255], "Ruoli terminati, iniziare il giorno con `-day`", general);
			return;
		}


		let roleID = moderatore.nightOrder.shift();//faccio venire il prossimo ruolo che deve giocare
		while(!moderatore.roleListID.includes(roleID)){
			if(moderatore.nightOrder.length === 0){
				embed.sendEmbed([0,255,0], "Ruoli terminati, iniziare il giorno con `-day`", general);
				return;
			}
			
			roleID = moderatore.nightOrder.shift();
		}

		let lupi = "";
		for(let player of moderatore.playerList.entries()){
			if((player[1].id === roleID) ||
				(roleID === f.capoBranco && player[1].id === f.giovaneLupo) ||
				(roleID === f.capoBranco && player[1].id === f.lupoDelBranco) ||
				(roleID === f.capoBranco && player[1].id === f.traditore && moderatore.nightNum === 1)){
				switch(roleID){
					case f.guaritore://guaritore
						if(player[1].tratto.includes('usato')){
							break;
						}

						let morenti = "";
						moderatore.playerDying.forEach(dying=> morenti += `${dying.toString()} sta morendo\n`);
						if(morenti.valueOf() === ""){
							morenti = "Nessuno sta morendo.";
						}
						
						setTimeout(()=>{
							let channel = message.guild.channels.cache.find(r => r.name === "uomini");
							embed.sendEmbed([149,193,255], morenti, channel);
						}, 4000);
						
					case f.mago://mago
					case f.medium://medium
					case f.strega://strega
					case f.veggente://veggente
						role = message.guild.roles.cache.find(r => r.name === "Uomini");
						player[0].roles.add(role).catch(console.error);
						break;


					case 2://lupi
						if(moderatore.nightNum === 1){
							if(player[1].id === f.capoBranco){
								lupi += `${player[0].toString()} è il Capo Branco\n`;
							} else if(player[1].id === f.lupoDelBranco){
								lupi += `${player[0].toString()} è un Lupo del Branco\n`;
							}else if (player[1].id === f.giovaneLupo){
								lupi += `${player[0].toString()} è il Giovane Lupo\n`;
							} else{
								lupi += `${player[0].toString()} è il Traditore\n`;
								break;
							}
						}
						let index = player[1].tratto.indexOf('usato');
						moderatore.playerList.get(player[0]).tratto.splice(index, 1);
						role = message.guild.roles.cache.find(r => r.name === "Lupi");
						player[0].roles.add(role).catch(console.error);
						break;


					case f.monaco://monaco
						mon.monaco(moderatore);
						embed.sendEmbed([149,193,255], `${componi(roleID)[0]} è il tuo turno${componi(roleID)[1]}`, general);
						recursive.execute(message,args,moderatore,auto);
						return;
					
					
					case f.prete://prete
						for(let player2 of moderatore.playerList.entries()){
							if(player2[1].id === f.peccatore){
								embed.sendEmbed([149,193,255], `${player2[0].toString()} è il Peccatore`, player[0]);
								embed.sendEmbed([149,193,255], `${componi(roleID)[0]} è il tuo turno`, general);
								recursive.execute(message,args,moderatore,auto);
								return;
							}
						}
						embed.sendEmbed([149,193,255], `${componi(roleID)[0]} è il tuo turno${componi(roleID)[1]}`, general);
						embed.sendEmbed([149,193,255], "Il Peccatore non è in gioco", player[0]);
						recursive.execute(message,args,moderatore,auto);
						return;
				}
			}
		}

		if(moderatore.nightNum === 1 && roleID === 2){
			setTimeout(()=>{
				let channel = message.guild.channels.cache.find(r => r.name === "lupi");
				embed.sendEmbed([149,193,255], lupi, channel);
			}, 4000);
		}

		embed.sendEmbed([149,193,255], `${componi(roleID)[0]} è il tuo turno${componi(roleID)[1]}`, general);
		

		if(auto){
			setTimeout(()=> {embed.sendEmbed([149,193,255], "mancano 15 secondi" , general)}, 30000);
			setTimeout(()=> {recursive.execute(message,args,moderatore,auto)} , 45000);
		}
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