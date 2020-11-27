module.exports ={
	errors: function(errIdList, moderatore, message){
		const embed = require("../functions/sendEmbed.js");
		

		for (var i = 0; i < errIdList.length; i++) {
			switch(errIdList[i]){
				case 0:
					if(moderatore.playerNum < 6 || moderatore.playerList.size < moderatore.playerNum){
						embed.sendEmbed([255,0,0], "Mancano dei giocatori o non è stato iniziato un nuovo gioco.", message.channel);
						return true;
					}
					break;

				case 1:
					if(!moderatore.playerList.has(message.member)){
						embed.sendEmbed([255,0,0], "Devi essere in gioco per poter eseguire i comandi.", message.channel);
						return true;
					}
					break;

				case 2:
					if(message.mentions.members.array().length !== 1){
						embed.sendEmbed([255,0,0], "Citare una persona.", message.channel);
						return true;
					}
					break;

				case 3:
					let mentioned = message.mentions.members.array();
	
					if(!moderatore.playerList.has(mentioned[0]) ||
					(mentioned.length == 2 && !moderatore.playerList.has(mentioned[1]))){
						embed.sendEmbed([255,0,0], "Citare una persona in gioco.", message.channel);
						return true;
					}
					break;

				case 4:
					if(message.member.voice.channel === null){
						embed.sendEmbed([255,0,0], "Devi essere in una chat vocale.", message.channel);
						return true;
					}
					break;

				case 5:
					if(moderatore.nightOrder.length != 0){
						embed.sendEmbed([255,0,0], "Ci sono dei ruoli ancora da eseguire", message.channel);
						return true;
					}
					break;

				
				case 6:
					const args = message.content.split(/ +/);
					args.shift();
					
					if(!args.every(value => !isNaN(parseInt(value)))){
						embed.sendEmbed([255,0,0], "Scrivere un numero!", message.channel);
						return true;
					}	
					break;

				case 7:
					if(moderatore.nightOrder.length === 0){
						embed.sendEmbed([255,0,0], "Non è notte.", message.channel);
						return true;
					}
					break;

				case 8:
					if(moderatore.finished){
						embed.sendEmbed([255,0,0], "La partita è conclusa!\nIniziare una nuova partita con `-newGame n` oppure\n`-chooseRole` per cambiare i ruoli con i giocatori attuali o\n`-reroll` per mantere ruoli e giocatori.", message.channel);
						return true;
					}
			}
		}
		return false;
	}
};