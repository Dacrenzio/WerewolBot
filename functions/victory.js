module.exports = {
	victory(moderatore){
		let cittadini = 0;
		let neutri = 0;
		let lupi = 0;
		let pazzo = false;
		let giullare = false;

		for(let player of moderatore.playerList.values()){
			if(player.fazione.valueOf() === "villaggio" && player.alive){
				cittadini += 1;
			}else if(player.fazione.valueOf() === "lupi" && player.alive){
				lupi += 1;
			} else if(player.fazione.valueOf() === '-' && player.alive){
				neutri += 1;
			} else if(player.id === 13 && !player.alive && player.tratto.includes('mangiato')){
				pazzo = true;
			} else if(player.id === 6 && !player.alive && player.tratto.includes('bruciato')){
				giullare = true;
			}
		}

		if((cittadini + neutri <= lupi) || cittadini === 0){
			return [true, "Hanno vinto i Lupi", pazzo, giullare];
		}

		if(lupi === 0){
			return [true, "Hanno vinto i Contadini", pazzo, giullare];
		}

		return [false];
	}
}