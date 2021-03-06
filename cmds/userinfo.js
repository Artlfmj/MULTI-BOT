const Discord = require('discord.js')

module.exports.run = async(client,message,args) => {

    let UserEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 512}))
        .addField(`Nom de l'utilisateur`, (message.author.username))
        .addField(`Tag`, message.author.tag)
        .addField(`Id`, message.author.id)
        .addField(`Statut`, message.author.presence.status)
        .addField(`Compte crée le`, message.author.createdAt)
        .setFooter('Demandé par ' + message.author.username)

        message.channel.send(UserEmbed)

}

module.exports.config = {
    name: 'userinfo'
}