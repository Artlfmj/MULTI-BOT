const Discord = require('discord.js')

module.exports.run = async(client,message,args) => {
    const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Beta')
        .setDescription('Ce bot étant en bot il est susceptible de contenir des erreurs')
        .addFields(
            { name: 'Comment les report?', value: 'Il vous suffit de rejoindre notre serveur de support pour nous les report', inline: false },
        )
    
        message.channel.send(embed);
    
}

module.exports.config = {
        name: 'beta'
    }