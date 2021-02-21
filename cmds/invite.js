const Discord = require('discord.js')

module.exports.run = async(client,message,args) => {
    const Invite = new Discord.MessageEmbed()
    .setTitle("Cliquez sur ce lien pour m'add!")
    .setURL("")
    .setImage(client.user.avatarURL)
    .setColor("RANDOM")
    
}

module.exports.config = {
        name: 'invite'
    }