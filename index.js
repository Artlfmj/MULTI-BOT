const Discord = require("discord.js")
const config = require("./config.json")

const client = new Discord.Client()

client.once('ready', () => {
    console.log('Ready!');
    console.log(`Connecté en tant que ${client.user.tag}!`);
	client.user.setActivity(`${client.guilds.cache.size.toString()} serveurs | ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} membres`, {type: "WATCHING"}); 
});

client.login(config.Token)