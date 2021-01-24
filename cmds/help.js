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
            .setDescription(`Le bot a comme prefix: \${config.Prefix}\ \n`)
        }
    }
    
}

module.exports.config = {
        name: 'help'
    }