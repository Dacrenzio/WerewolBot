module.exports = {
	name: 'kill',
	description: "this command let the wolf kill a player",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		const f = require("../figures.js");
		let err = require("../functions/errors");

		if(err.errors([0,1,7,8], moderatore, message))return;

		if(moderatore.playerList.get(message.member).tratto.includes('usato')){
			embed.sendEmbed([255,0,0], "Avete già ucciso qualcuno stanotte.", message.channel);
			return;
		}

		let mentionedArray= message.mentions.members.array();

		let youngWolfBurned = false;
		//check if the burned is the young wolf
		if(moderatore.burnedPlayer !== null && 
		moderatore.playerList.get(moderatore.burnedPlayer).id === f.giovaneLupo){
			youngWolfBurned = true;
		}
		
		if(mentionedArray.length !== 1 && !youngWolfBurned){//if they call more or less then 1 people when the young wolf is not burned
			embed.sendEmbed([255,0,0], "Citare una persona da uccidere", message.channel);
			return;
		}else if(mentionedArray.length !== 2 && youngWolfBurned){//if the call more or less then 2 people when the young wolf is burned
			embed.sendEmbed([255,0,0], "Citare due persone da uccidere", message.channel);
			return;
		}
		if(err.errors([3], moderatore, message))return;

		
		
		let caller = moderatore.playerList.get(message.member);

		if((caller.id === f.capoBranco || caller.id === f.lupoDelBranco) && caller.alive){ //check if he's roleID: 2 or 8

			mentionedArray.forEach(mentioned =>{
				let called = moderatore.playerList.get(mentioned);

				if(!called.alive){
					embed.sendEmbed([255,0,0], `${mentioned.toString()} è già morto!`, message.channel);
					return;
				}

				if(called.id === f.traditore){
					embed.sendEmbed([149,193,255], `${mentioned.toString()} sarà avvisato della vostra presenza`, message.channel);
					
					let lupi = "";
					for(let player of moderatore.playerList.entries()){
						if(player[1].id === f.capoBranco ||
						player[1].id === f.giovaneLupo ||
						player[1].id === f.lupoDelBranco)

							lupi += `${player[0].toString()} è un lupo.\n`;
					}
					embed.sendEmbed([149,193,255], lupi, mentioned);
					return;
				
				}

								
				if(called.tratto.includes('protetto') || caller.tratto.includes('pazzo')){
					if(caller.tratto.includes('pazzo')){
						embed.sendEmbed([149,193,255], `${mentioned.toString()} sarà ucciso di mattina`, message.channel);
					}else{
						embed.sendEmbed([149,193,255], `${mentioned.toString()} non può essere ucciso.`, message.channel);
					}

				}else{
					embed.sendEmbed([149,193,255], `${mentioned.toString()} sarà ucciso di mattina`, message.channel);
					if(called.tratto.includes('amato')){
						let amato = called.tratto[(called.tratto.indexOf('amato'))+1];
						moderatore.playerList.get(amato).tratto.push('mangiato');
						moderatore.playerDying.push(amato);
						embed.sendEmbed([149,193,255], "Il tuo amato è in pericolo.",amato);
					}else{
						moderatore.playerList.get(mentioned).tratto.push('mangiato');
						moderatore.playerDying.push(mentioned);
					}
				}
			});

			//metto ai lupi il tratto 'usato' per la notte
			for(let wolves of moderatore.playerList.entries()){
				if(wolves[1].id === f.capoBranco || wolves[1].id === f.lupoDelBranco){
					moderatore.playerList.get(wolves[0]).tratto.push('usato');

					//rimuovo il tratto pazzo
					let index = player[1].tratto.indexOf('pazzo');
					if(index != -1){
						moderatore.playerList.get(wolves[0]).tratto.splice(index, 1);
					}
				}
			}
				
		}else{
			message.delete();
			embed.sendEmbed([255,0,0], "Non hai il ruolo adatto per sbranare vite.", message.author);
		}
	}
}