const Discord = require('discord.js')

module.exports.run = async(client,message,args) => {

    let ServerEmbed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name)
    .setThumbnail(message.guild.iconURL({dynamic: true, size: 512}))
    .addField(`Nom du serveur`, (message.guild.name))
    .addField(`Propriétaire`, message.guild.owner)
    .addField(`Nombre de membres`, message.guild.memberCount)
    .addField(`Nombre de roles`, message.guild.roles.cache.size)
    .setFooter('Demandé par ' + message.author.username)

    message.channel.send(ServerEmbed)

}

module.exports.config = {
    name: 'serverinfo'
}