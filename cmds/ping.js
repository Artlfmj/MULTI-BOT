const Discord = require('discord.js')
var currentHour = new Date().getHours();
var currentMin = new Date().getMinutes();
module.exports.run = async(client,message,args) => {
    
      const Ping = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .addField(':stopwatch: Time', `__**${currentHour}:${currentMin}**__`)
      .addField(':hourglass_flowing_sand: Latency', `__**${Math.round(client.ws.ping)}ms**__`)
      .addField(':heartbeat: API', `__**${Math.floor(client.ping)}ms**__`)
      message.channel.send(Ping)
}

module.exports.config = {
        name: 'ping'
    }