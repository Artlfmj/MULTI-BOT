const Discord = require("discord.js");
const colours = require("../colours.json");
 
module.exports.run = async (bot, message, args) => {
 
   if(!bot.lockit) bot.lockit = [];
   let validUnlocks = ["release", "unlock"]
 
   if(validUnlocks.includes()) {
    message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: null
    }).then(() => {
        message.channel.send("Le salon est réouvert !")
    })
   } else {
    message.channel.updateOverwrite(message.guild.id, {
        SEND_MESSAGES: null
    }).then(() => {
        let embed128309 = new Discord.MessageEmbed()   
        .setColor("#00FFF7")
        .setTitle(`<:oui:763065449717563452> | Le Salon a bien été Ouvert !`)
        .setDescription("")
        .setThumbnail("")
        .setImage("")
        message.channel.send(embed128309)
    })
   }
}
 
module.exports.config = {
    name: "unlock"
}