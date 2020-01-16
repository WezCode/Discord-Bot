const Discord = require("discord.js"); //looks in node_modules folder for discord.js
const { prefix, token } = require("./auth.json");
const fs = require("fs");
const bot = new Discord.Client();

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd === `${prefix}botinfo`) {
    let botembed = new Discord.RichEmbed()
      .setDescription("Bot Information")
      .setColor("#15f153")
      .addField("Bot Name", bot.user.username);

    return message.channel.send(botembed);
  } else if (cmd === "change") {
    message.member
      .setNickname("Panda Nugget")
      .then(console.log)
      .catch(console.error);
  } else if (cmd === "hello") {
    var text = fs.readFileSync("./n.txt");
    let textString = text.toString();
    let textArray = textString.split("\n");
    let random = Math.floor(Math.random() * 3);
    message.channel.send(`${textArray[random]}`);
  }
});

bot.on("voiceStateUpdate", (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;

  var text = fs.readFileSync("./nuggets.txt");
  let textString = text.toString();
  let textArray = textString.split("\n");
  let random = Math.floor(Math.random() * 358);
  // message.channel.send(`${textArray[random]}`);

  if (oldUserChannel === undefined && newUserChannel !== undefined) {
    newMember
      .setNickname(`${textArray[random]}` + " nugget")
      .then(console.log)
      .catch(console.error);
  } else if (newUserChannel === undefined) {
    // User leaves a voice channel
  }
});

bot.login(token);
