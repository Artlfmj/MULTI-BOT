const Discord = require('discord.js')
var currentHour = new Date().getHours();
var currentMin = new Date().getMinutes();

module.exports.run = async(client,message,args) => {
    const Heure = new Discord.MessageEmbed()
    .setTitle("Heure actuelle")
    .setDescription("Voici l'heure actuelle sur le fuseau horaire Paris:")
    .addField(currentHour + ":" + currentMin, 'Fuseau Paris/Bruxelles CET', true)
    .setColor("RANDOM")
    .setFooter("©Multi-bot | ©Intermarket 2021 by Artlfmj#0001")
    message.channel.send(Heure);
}

module.exports.config = {
        name: 'heure'
    }