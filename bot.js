var Discord = require("discord.io");
var logger = require("winston");
var auth = require("./auth.json");
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true
});
logger.level = "debug";
// Initialize Discord Bot
const bot = new Discord.Client({
  token: auth.token,
  autorun: true
});
bot.on("ready", function(evt) {
  logger.info("Connected");
  logger.info("Logged in as: ");
  logger.info(bot.username + " - (" + bot.id + ")");
});

bot.on("message", function(user, userID, channelID, message, evt) {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  if (message.substring(0, 1) == "!") {
    var args = message.substring(1).split(" ");
    var cmd = args[0];

    args = args.splice(1);
    switch (cmd) {
      // !ping
      case "ping":
        bot.sendMessage({
          to: channelID,
          message: "Pong!"
        });
        bot.break;
      case "change":
        let member = message.author;
        member.setNickname("cool guy").then(member => {
          message.channel.send(member.displayName + "is a cool guy");
        });
      // Just add any case commands if you want to..
    }
  }
});

// bot.on("voiceStateUpdate", (oldMember, newMember) => {
//   // Here I'm storing the IDs of their voice channels, if available
//   let oldChannel = oldMember.guild.voiceChannel
//     ? oldMember.guild.voiceChannel.id
//     : null;
//   let newChannel = newMember.guild.voiceChannel
//     ? newMember.guild.voiceChannel.id
//     : null;
//   if (oldChannel == newChannel) return; // If there has been no change, exit

//   // Here I'm getting the bot's channel (bot.voiceChannel does not exist)
//   let botMember = oldMember.guild.member(bot.user),
//     botChannel = botMember ? botMember.voiceChannel.id : null;

//   //   // Here I'm getting the channel, just replace VVV this VVV with the channel's ID
//   //   let textChannel = oldMember.guild.channels.get("CHANNEL_ID_HERE");
//   //   if (!textChannel) throw new Error("That channel does not exist.");

//   // Here I don't need to check if they're the same, since it would've exit before
//   if (newChannel == botChannel) {
//     // console.log("A user joined.");
//     textChannel.send(`${newMember} has joined the voice channel.`);
//   } else if (oldChannel == botChannel) {
//     // console.log("A user left.");
//     textChannel.send(`${newMember} has left the voice channel.`);
//   }
// });

bot.on("message", message => {
  if (message === "!change") {
    let member = message.author;
    member.setNickname("cool guy").then(member => {
      message.channel.send(member.displayName + "is a cool guy");
    });
  }
});
