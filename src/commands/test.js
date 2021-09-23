const { Command } = require("@sapphire/framework");
const Discord = require("discord.js");

class UserCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      description: "test command",
    });
  }

  async run(message) {
    let embed = new Discord.MessageEmbed()
      .setTitle("test embed")
      .addField("test", "New comment");
    message.channel.send({
      embeds: [embed],
    });
  }
}

exports.UserCommand = UserCommand;
