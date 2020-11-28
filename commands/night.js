module.exports = {
	name: 'night',
	description: "this command starts the night and provide the night role order based on the night",
	execute(message, args, moderatore, auto){
		const embed = require("../functions/sendEmbed.js");
		const figures = require('../figures.js');
		const ytdl = require('ytdl-core');
		const err = require("../functions/errors");
		const start = require('./next.js');

		if(err.errors([0,5,4,8], moderatore, message))return;

		let channel = message.member.voice.channel;
		
		let mod = message.guild.roles.cache.find(r => r.name === "Moderatore").members;
			
		channel.join().then(connection => connection.play(ytdl('https://www.youtube.com/watch?v=WPpVMmTt74Q&ab_channel=SwordCoastSoundscapes', {quality: 'lowestaudio'})));
		
		
		channel.members.difference(mod).each(member =>{
			if(!member.user.bot)
				member.voice.setMute(true);
		});
		

		moderatore.nightNum += 1;
		moderatore.ballottaggio = [];
		
		if(moderatore.nightNum === 1){
			moderatore.nightOrder = [figures.veggente, figures.mago, figures.monaco, figures.prete, figures.angelo, figures.capoBranco];
		}else{
			moderatore.nightOrder = [figures.veggente, figures.medium, figures.mago, figures.strega, figures.capoBranco, figures.guaritore, 0];
		}

		embed.sendEmbed([149,193,255], `Inizio della notte N.${moderatore.nightNum}`, message.channel);
		start.execute(message, args, moderatore, auto);
	}
}