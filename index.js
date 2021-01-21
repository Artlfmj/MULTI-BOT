const Discord = require("discord.js")
const config = require("./config.json")

const client = new Discord.Client()

client.once('ready', () => {
    console.log('Pret!');
    console.log(`Connecté en tant que ${client.user.tag}!`);
    console.log(`%c __________________________________________________________________________

     __  ___      ____  _       ____        __     ____        ___            __
     /  |/  /_  __/ / /_(_)     / __ )____  / /_   / __ \____  / (_)___  ___  / /
    / /|_/ / / / / / __/ /_____/ __  / __ \/ __/  / / / / __ \/ / / __ \/ _ \/ / 
   / /  / / /_/ / / /_/ /_____/ /_/ / /_/ / /_   / /_/ / / / / / / / / /  __/_/  
  /_/  /_/\__,_/_/\__/_/     /_____/\____/\__/   \____/_/ /_/_/_/_/ /_/\___(_)   `, "font-family:monospace")

  let statuses = [
      `${client.guilds.cache.size.toString()} serveurs | ${client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b)} membres`,
      "BETA"
      
  ]
    
  setInterval(function(){
      let status = statuses[Math.floor(Math.random() * statuses.length)]
      client.user.setActivity( status, {type: "WATCHING"}); 
      
  })
});


client.on("message", async message =>{
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = config.Prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    ///Commande User-info
    if(message.content.startsWith((config.Prefix) +`userinfo`) ){

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

    /// Commande ServerInfo
    if(message.content.startsWith((config.Prefix) +`serverinfo`) ){

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
});

client.login(config.Token)