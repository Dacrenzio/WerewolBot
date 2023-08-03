const Discord = require("discord.js");
const { Client, GatewayIntentBits  } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessageTyping
  ],
});
const prefix = "-";
const fs = require("fs");
const Moderatore = require("./functions/Moderatore.js");
const embed = require("./functions/sendEmbed.js");
const {key} = require("./secretKey.json");

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

var mods = new Map();

client.once("ready", () => {
  console.log("bot is online\n");

  client.user.setActivity("-help", { type: 2 });

  client.guilds.cache.each((guild) => {
    mods.set(guild.id, new Moderatore());
  });
});

client.on("guildCreate", (guild) => {
  mods.set(guild.id, new Moderatore());
});

client.on("guildDelete", (guild) => {
  mods.delete(guild.id);
});

client.on("messageCreate", (message) => {
  if (
    !message.content.startsWith(prefix) ||
    message.author.bot ||
    message.channel.type === "dm"
  )
    return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command.valueOf() === "next" && mods.get(message.guild.id).automatic) {
    embed.sendEmbed(
      [255, 0, 0],
      "Non puoi eseguire `-next` con la modalità auto",
      message.channel
    );
    return;
  }

  if (client.commands.has(command))
    client.commands
      .get(command)
      .execute(message, mods.get(message.guild.id), args, client);
});

client.login(key);
