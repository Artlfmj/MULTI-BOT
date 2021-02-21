const Discord = require("discord.js");
const colours = require("../colours.json");
 
module.exports.run = async (bot, message, args) => {
 
   if(!bot.lockit) bot.lockit = [];
   let validUnlocks = ["release", "unlock"]
 
   if(validUnlocks.includes()) {
    message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: null
    }).then(() => {
        let embed1283 = new Discord.MessageEmbed()   
        .setColor("#00FFF7")
        .setTitle(`<:oui:763065449717563452> | Le Salon a Bien été Fermé !`)
        .setDescription("")
        .setThumbnail("")
        .setImage("")
        .setFooter("Lock Channel")
        .setTimestamp()
        message.channel.send(embed1283)
    })
   } else {
    message.channel.updateOverwrite(message.guild.id, {
        SEND_MESSAGES: false
    }).then(() => {
        let embed1283 = new Discord.MessageEmbed()   
        .setColor("#00FFF7")
        .setTitle(`<:oui:763065449717563452> | Le Salon a Bien été Fermé !`)
        .setDescription("")
        .setThumbnail("")
        .setImage("")
        message.channel.send(embed1283)
    })
   }
}
 
module.exports.config = {
    name: "lock"
}