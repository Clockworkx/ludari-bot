const { SapphireClient, LogLevel } = require("@sapphire/framework");
const { token } = require("./config.json");
//const { Intents } = require("discord.js");

const client = new SapphireClient({
  defaultPrefix: ".",
  regexPrefix: /^(hey +)?bot[,! ]/i,
  caseInsensitiveCommands: true,
  shards: "auto",
  logger: {
    level: LogLevel.Debug,
  },
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_VOICE_STATES",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
  ],
});

const main = async () => {
  try {
    client.logger.info("Logging in..");
    await client.login(token);
    client.logger.info("Logged in successfully");
  } catch (error) {
    client.logger.fatal(error);
    client.destroy();
    process.exit(1);
  }
};

main();
