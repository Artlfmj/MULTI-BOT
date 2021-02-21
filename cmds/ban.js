const Discord = require("discord.js");
const colours = require("../colours.json");


module.exports.run = async (bot, message, args) =>{

    let banedReason = args.join(" ").slice(22);
   if(!message.member.hasPermission("BAN_MEMBERS")) {
       return message.channel.send(":x: | Tu n'a pas les permissions suffisante !")
    }
        
        if(message.content.startsWith){
            let banedUser = message.mentions.members.first();

            if(banedUser == undefined) {
                let banEmbed2 = new Discord.MessageEmbed()
                .setTitle(':x: | Je Ne Trouve pas ce Membre !')
                .setColor('#FF0000')
                message.channel.send(banEmbed2)

            }
            else {
                if(banedUser.bannable){
                    banedUser.ban();
                    let banEmbed = new Discord.MessageEmbed()
                    .setDescription("✔️ | Cet Utilisateur vient d'être Banni !")
                    .setColor('#FF0000')
                    .addField(`**${banedUser}** Vient d'être Ban !`)
                    .addField(`ID Banni : **${banedUser.id}**`)
                    .addField(`Banni Par **${message.author}**`)
                    .addField(`ID Admin : **${message.author.id}**`)
                    .setFooter('✔️ | Utilisateur Banni avec succès !')
                    message.channel.send(banEmbed)
                }
                else{
                    messsage.reply("<:non:762340052666679306> | Impossible De Ban cette Personne !")
                }
            }
        } 
        
 
    }

module.exports.config = {
    name: "ban"
}