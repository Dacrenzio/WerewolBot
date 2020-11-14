module.exports = {
	name: 'kill',
	description: "this command let the wolf kill a player",
	execute(message, args, moderatore){
		const embed = require("../functions/sendEmbed.js");
		let mentionedArray= message.mentions.members.array();
		let youngWolfBurned = false;

		if(!moderatore.playerList.has(message.member)){
			embed.sendEmbed([255,0,0], "Devi essere in gioco per poter eseguire i comandi.", message.channel);
			return;
		}
		

		for(let player of moderatore.playerList.keys()){//check if the burned is the young wolf
			if(player[0] === moderatore.burnedPlayer && player[1].id === 5){
				youngWolfBurned = true;
				break;
			}
		}

		if(mentionedArray.length !== 1 && !youngWolfBurned){//if they call more or less then 1 people when the young wolf is not burned
			embed.sendEmbed([255,0,0], "Citare una persona da uccidere", message.channel);
			return;
		}else if(mentionedArray.length !== 2 && youngWolfBurned){//if the call more or less then 2 people when the young wolf is burned
			embed.sendEmbed([255,0,0], "Citare due persone da uccidere", message.channel);
			return;
		}


		let caller = moderatore.playerList.get(message.member);


		if((caller.id === 2 || caller.id === 8) && caller.alive){ //check if he's roleID: 2 or 8

			mentionedArray.forEach(mentioned =>{
				let called = moderatore.playerList.get(mentioned);

				if(!moderatore.playerList.has(mentioned)){
					embed.sendEmbed([255,0,0], "Citare una persona in gioco.", message.channel);
					return;
				}

				if(!called.alive){
					embed.sendEmbed([149,193,255], `${mentioned.toString()} è già morto!`, message.channel);
					return;
				}

				if(called.id === 17){
					embed.sendEmbed([149,193,255], `${mentioned.toString()} sarà avvisato della vostra presenza`, message.channel);
					
					let lupi = "";
					for(let player of moderatore.playerList.values()){
						if(player[1].id === 2 || player[1].id === 5 || player[1].id === 8)
							lupi += `${player[0].toString()} è un lupo.\n`;
					}
					embed.sendEmbed([149,193,255], lupi, mentioned);
					return;
				
				}else{
					embed.sendEmbed([149,193,255], `${mentioned.toString()} sarà ucciso di mattina`, message.channel);
				}

								
				if(called.tratto.includes('protetto') || caller.tratto.includes('pazzo')){
					if(caller.tratto.includes('pazzo')){
						for(let player of moderatore.playerList.entries()){
							if(player[1].id === 2 || player[1].id === 5){
								let index = player[1].tratto.indexOf('pazzo');
								moderatore.playerList.get(player[0]).tratto.splice(index, 1);
							}
						}
					} else if(called.id !== 4){//if protetto dalla strega
						let index = moderatore.playerList.get(entrie).tratto.indexOf('protetto');
						moderatore.playerList.get(mentioned).tratto.splice(index, 1);
					}
				}else{
					moderatore.playerDying.push(mentioned);
				}
			});
				
		}else{
			message.delete();
			embed.sendEmbed([255,0,0], "Non hai il ruolo adatto per sbranare vite.", message.author);
		}
	}
}
