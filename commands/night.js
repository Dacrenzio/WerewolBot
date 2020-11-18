module.exports = {
	name: 'night',
	description: "this command starts the night and provide the night role order based on the night",
	execute(message, args, moderatore){
		let embed = require("../functions/sendEmbed.js");
		const figures = require('../figures.js');
		const ytdl = require('ytdl-core');

		if(moderatore.playerList.size < 6 || moderatore.playerList.size < moderatore.playerNum){
			embed.sendEmbed([255,0,0], "Mancano dei giocatori o non è stato iniziato un nuovo gioco.", message.channel);
			return;
		}

		if(moderatore.nightOrder.length != 0){
			embed.sendEmbed([255,0,0], "Impossibile far calare la notte con ruoli ancora da eseguire", message.channel);
			return;
		}

		let channel = message.member.voice.channel;
		if(channel != null){
			let mod = message.guild.roles.cache.find(r => r.name === "Moderatore").members;
			let bot = message.guild.roles.cache.find(r => r.name === "WereBot").members;
			let mods = mod.concat(bot);
			
			channel.join().then(connection => connection.play(ytdl('https://youtu.be/a0Av2XNPd_g', {quality: 'highestaudio'})));
			
			
			if(channel.members.has(bot.firstKey()))
				channel.members.difference(mods).each(member => member.voice.setMute(true));
			else{
				channel.members.difference(mod).each(member => member.voice.setMute(true));
			}			
			

		} else {
			embed.sendEmbed([255,0,0], "Entrare in una chat vocale per iniziare la notte.", message.channel);
			return;
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