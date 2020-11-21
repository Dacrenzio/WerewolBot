module.exports = {
	name: 'mode',
	description: "Set the mod of the bot: auto or manual",
	execute(message,args,mod){
		const embed = require("../functions/sendEmbed.js");

		if(args.length !== 1){
			embed.sendEmbed([255, 0, 0], "Scrivere o `auto` o `manual` a seguito di `-mode`", message.channel);
			return;
		}

		if(args[0].valueOf() === 'auto'){
			mod.get(message.guild.id)[1] = true;
		}else if(args[0].valueOf() === 'manual'){
			mod.get(message.guild.id)[1] = false;
		} else{
			embed.sendEmbed([255, 0, 0], "Inserire la modalità `auto` o `manual`", message.channel);
		}

	}
}