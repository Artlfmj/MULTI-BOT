const Discord = require('discord.js')
const config = require('../config.json')

module.exports.run = async(client,message,args) => {
    if(args[0] === "help") return message.channel.send(`Vous devez juste faire: ${config.Prefix}help`);

    if (args[0]) {
        let command = args[0];
        if(client.commands.has(command)) {
            command = client.commands.get(command)
            let SHEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Multi-Bot | Footer`, message.guild.iconURL({dynamic: true, size: 512}))
            .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 512}))
            .setDescription(`Le bot a comme prefix: ${config.Prefix} \n \n`)

            message.channel(SHEmbed)
        }
    }
    
    if(args[0]){
        message.delete()
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Commande d'aide`, message.guild.iconURL({dynamic: true, size: 512}))
        .setColor('RANDOM')
        .setDescription(`${message.author.username} va voir tes mps!`)
        
        let Sembed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`Multi-bot AIDE`, message.guild.iconURL({dynamic: true, size: 512}))
        .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 512}))
        .setDescription(`Voici toutes les commandes disponibles pour le bot ${client.user.username} \n Le préfix du bot est **${config.Prefix}**`)
        .addField(`Commandes pour les membres:`, "")
        .addField(`Commandes pour les membres:`, "")
        .setFooter(`MULTI-BOT | Footer`, client.user.displayAvatarURL({dynamic: true, size: 512}))

        message.channel.send(embed)
        .then(m => m.delete(5000))
        message.author.send(Sembed)
    }
}

module.exports.config = {
        name: 'help'
    }