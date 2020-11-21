const Discord = require('discord.js');
const client = new Discord.Client();
const figures = require('./figures.js');
const prefix = '-';
const fs = require('fs');
const Moderatore = require('./functions/Moderatore.js');

const t = require('./try');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

var mod = new Map();

client.once('ready', () =>{
	console.log('bot is online\n');
	
	client.guilds.cache.each(guild =>{
		mod.set(guild.id, new Moderatore(0,-1,false,new Map(), [], [], [], null, 0, [], 0, true));
	});

	//t.try();
});


client.on("guildCreate", guild =>{
	mod.set(guild.id, new Moderatore(0,-1,false,new Map(), [], [], [], null, 0, [], 0, true));
});

client.on("guildDelete", guild =>{
	mod.delete(guild.id);
});



client.on('message', message =>{
	if(!message.content.startsWith(prefix) || message.author.bot || message.channel.type === "dm") return;
	
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if(client.commands.has(command))
		client.commands.get(command).execute(message, args, mod.get(message.guild.id), client);
});





client.login('NzczNzI4NzE2OTc0ODUwMDU5.X6NdBQ.bWeMz4jgSr1cqMTX8_G1WL1JdKg');