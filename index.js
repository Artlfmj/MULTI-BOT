const Discord = require("discord.js")
const config = require("./config.json")
const fs = require('fs')
const DisTube = require('distube')

const client = new Discord.Client()

client.commands = new Discord.Collection();

fs.readdir('./cmds/', (err, files) => {
    if(err) console.log(err)
    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if(jsfile.length <= 0) {
        console.log('[HANDLER]: Aucune commande trouvée')

    }

    jsfile.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`[HANDLER]: ${f} ok!`)
    client.commands.set(props.config.name, props)
    })
})

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

    let commandFile = client.commands.get(command.slice(config.Prefix.length))
    if(commandFile) commandFile.run(client, message, args)

});

// Create a new DisTube
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.Prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift();

    if (command == "play")
        distube.play(message, args.join(" "));

    if (["repeat", "loop"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));

    if (command == "stop") {
        distube.stop(message);
        message.channel.send("Stopped the music!");
    }

    if (command == "skip")
        distube.skip(message);

    if (command == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }

    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter || "Off"));
    }
});

// Queue status template
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// DisTube event listeners, more in the documentation page
distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });

client.login(config.Token)