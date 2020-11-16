const Discord = require('discord.js');
const client = new Discord.Client();
const figures = require('./figures.js');
const prefix = '-';
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}


var moderatore ={
	nightNum: 0,
	playerNum: -1,
	auraType: false,
	playerList: new Map(),
	playerDying: [],
	roleListID: [],
	nightOrder: [],
	burnedPlayer: null,
	numberOfVotes: 0,
	ballottaggio: [],
	numberOfDeadPlayer: 0
};


client.once('ready', () =>{
	console.log('bot is online\n');
});


client.on('message', message =>{
	if(!message.content.startsWith(prefix) || message.author.bot || message.channel.type === "dm") return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if(client.commands.has(command))
		client.commands.get(command).execute(message, args, moderatore, client);
});



client.login('NzczNzI4NzE2OTc0ODUwMDU5.X6NdBQ.bWeMz4jgSr1cqMTX8_G1WL1JdKg');