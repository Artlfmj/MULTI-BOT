const Discord = require("discord.js")
 
module.exports.run = async (bot, message, args) => {
 
    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} jour(s), ${hrs.padStart(2, '0')} heure(s), ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} secondes.`
    }

    var uptime = new Discord.MessageEmbed()


    .setTitle(`⚡ Uptime | ${bot.user.username} `)
    .addField("Je suis en ligne depuis ", ` ${duration(bot.uptime)}`)
    .setFooter(`${bot.user.tag}`, bot.user.displayAvatarURL)
    .setColor("RANDOM")
    message.channel.send(uptime)
    
}
module.exports.config = {
    name: "uptime"
}