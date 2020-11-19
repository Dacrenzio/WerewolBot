module.exports = {
	name: 'night',
	description: "this command starts the night and provide the night role order based on the night",
	execute(message, args, moderatore){
		let embed = require("../functions/sendEmbed.js");
		const figures = require('../figures.js');
		const ytdl = require('ytdl-core');
		let err = require("../functions/errors");

		if(err.errors([0,5,4], moderatore, message))return;

		let channel = message.member.voice.channel;
		
		let mod = message.guild.roles.cache.find(r => r.name === "Moderatore").members;
		let bot = message.guild.roles.cache.find(r => r.name === "WereBot").members;
		let mods = mod.concat(bot);
			
		channel.join().then(connection => connection.play(ytdl('https://youtu.be/a0Av2XNPd_g', {quality: 'highestaudio'})));
			
			
		if(channel.members.has(bot.firstKey()))
			channel.members.difference(mods).each(member => member.voice.setMute(true));
		else{
			channel.members.difference(mod).each(member => member.voice.setMute(true));
		}

		moderatore.nightNum += 1;
		moderatore.ballottaggio = [];
		channel.join().then(connection => connection.play(ytdl('https://youtu.be/a0Av2XNPd_g', {quality: 'highestaudio'})));
		
		if(moderatore.nightNum === 1){
			moderatore.nightOrder = [figures.veggente, figures.mago, figures.monaco, figures.prete, figures.capoBranco];
		}else{
			moderatore.nightOrder = [figures.veggente, figures.medium, figures.mago, figures.strega, figures.capoBranco, figures.guaritore];
		}

		embed.sendEmbed([149,193,255], `Inizio della notte N.${moderatore.nightNum}`, message.channel);
	}
}