const { SapphireClient } = require("@sapphire/framework");
const { token } = require("./config.json");
//const { Intents } = require("discord.js");

const client = new SapphireClient({
  defaultPrefix: "dr!",
  regexPrefix: /^(hey +)?bot[,! ]/i,
  caseInsensitiveCommands: true,
  shards: "auto",
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

client.login(token);
