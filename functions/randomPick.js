module.exports ={
	execute(moderatore, message, auto){
		const embed = require("../functions/sendEmbed.js");
		let extractedRole = [0, 1];
		let extractedPlayer = [];
		let memberList = [];

		

		for(let member of moderatore.playerList.keys()){
			memberList.push(member);
		}

		let listRole = "";
		let before8 = 0;
		let before5 = 0;
		
		for (var i = 0; i < moderatore.playerList.size; i +=1 ) {
			let ranPlayer = Math.floor(Math.random() * moderatore.playerList.size);
			while(extractedPlayer.includes(ranPlayer))
				ranPlayer = Math.floor(Math.random() * moderatore.playerList.size);

			extractedPlayer.push(ranPlayer);

			if(i === 0){
				moderatore.playerList.get(memberList[ranPlayer]).id = 2;
				listRole += `${memberList[ranPlayer].toString()} ` + compose(2);

			} else if(i === 1){
				moderatore.playerList.get(memberList[ranPlayer]).id = 18;
				listRole += `${memberList[ranPlayer].toString()} `+ compose(18);

			}else if(i <= moderatore.playerList.size/4){

				if(moderatore.roleListID.indexOf(8, before8) > 0){
					moderatore.playerList.get(memberList[ranPlayer]).id = 8;
					listRole += `${memberList[ranPlayer].toString()} ` + compose(8);
					extractedRole.push(moderatore.roleListID.indexOf(8, before8));
					before8 = moderatore.roleListID.indexOf(8, before8);

				}else if(moderatore.roleListID.indexOf(5, before5) > 0){
					moderatore.playerList.get(memberList[ranPlayer]).id = 5;
					listRole += `${memberList[ranPlayer].toString()} ` + compose(5);
					extractedRole.push(moderatore.roleListID.indexOf(5, before5));
					before5 = moderatore.roleListID.indexOf(5, before5);

				}else{
					embed.sendEmbed([255,0,0],"Inserire almeno 1 lupo ogni 4 giocatori!", message.channel);
					return false;
				}

			}else{

				let ranRole = Math.floor(Math.random() * moderatore.roleListID.length);
				while(extractedRole.includes(ranRole))
					ranRole = Math.floor(Math.random() * moderatore.roleListID.length);

				moderatore.playerList.get(memberList[ranPlayer]).id = moderatore.roleListID[ranRole];
				extractedRole.push(ranRole);

				listRole += `${memberList[ranPlayer].toString()} `+ compose(moderatore.roleListID[ranRole]);
			}
		}
		
		if(!auto)
			embed.sendEmbed([149,193,255], listRole, message.member);
		return true;
	}
}


function compose(ranRole){	
	switch(ranRole){
		case 1: return `è il Bardo.\n`;
		case 2: return `è il Capo Branco.\n`;
		case 3: return `è il Contadino.\n`; 
		case 4: return `è l'Eremita.\n`; 
		case 5: return `è il Giovane Lupo.\n`; 
		case 6: return `è il Giullare.\n`; 
		case 7: return `è il Guaritore.\n`; 
		case 8: return `è il Lupo Del Branco.\n`; 
		case 9: return `è il Mago.\n`; 
		case 10: return `è il Medium.\n`;
		case 11: return `è il Monaco.\n`;
		case 12: return `è l'Oste.\n`;
		case 13: return `è il Pazzo.\n`;
		case 14: return `è il Peccatore.\n`;
		case 15: return `è il Prete.\n`; 
		case 16: return `è il Strega.\n`;
		case 17: return `è il Traditore.\n`;
		case 18: return `è la Veggente.\n`;
	}
}