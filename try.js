module.exports ={
	try(){
		const Moderatore = require('./functions/Moderatore.js');
		const PlayerRole = require('./functions/PlayerRole.js');


		let mod = new Moderatore(1,5,null,new Map(),null,null,null,null,null,null,1,false);
		mod.playerList.set("player 1", new PlayerRole( 1, "villaggio",null,null, [], true,null));
		mod.playerList.set("player 2", new PlayerRole( 12, "villaggio",null,null, [], true,null));
		mod.playerList.set("player 3", new PlayerRole( 18, "villagio",null,null, [], true,null));
	}
}