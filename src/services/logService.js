const Discord = require("discord.js");
const { SapphireClient } = require("@sapphire/framework");
const config = require("../config.json");
Tail = require("tail").Tail;

const logPath = config.logPath;

const logService = function (client) {
  console.log("Logpath", logPath);
  if (!logPath) return;
  const guild = client.guilds.cache.find(
    (guild) => guild.id === config.guildId
  );
  const channel = guild.channels.cache.find(
    (channel) => channel.id === config.channelId
  );

  logWatcher(channel);
};

const threadManager = async (channel) => {
  const existingThread = channel.threads.cache.find(
    (thread) => thread.name === "Crash Logs"
  );
  if (existingThread === undefined) {
    console.log("can't find existing, creating new")
    const thread = await channel.threads.create({
      name: "Crash Logs",
      autoArchiveDuration: 60 * 24,
    });
    return thread;
  }
  console.log("found existing thread")
  return existingThread;
};

const getThread = async (channel) => {
  const thread = await threadManager(channel);
  if (thread.archived) {
    console.log("thread archived, unarchiving..")
    await thread.setArchived(false).then(thread => {
      console.log(`Thread is now ${thread.archived ? "archived" : "unarchived"}`)
    })
    .catch(error => {
      console.log(error);
    })
  }
  if (thread.locked) {
    thread
      .setLocked(false)
      .then((newThread) =>
        console.log(`Thread is now ${newThread.locked ? "locked" : "unlocked"}`)
      )
      .catch((error) => {
        console.log(error);
      });
  }
  return thread;
};

const logWatcher = async (channel) => {
  let tail = new Tail(logPath, { separator: /\|/ }); //logger: console

  tail.on("line", async (data) => {
    console.log("Changed detected:\n", data.trim());
    if (!data.includes("FATAL") && !data.includes("ERROR")) {
      console.log("Doesn't include Fatal or Error");
      return;
    }
    // if (
    //   ["test"].some((e) => {
    //     data.includes(e);
    //   })
    // ) {
    const date = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/-/g, "/")
      .replace("T", " ");

    const dateFileName = date
      .replace(/\//g, "-")
      .replace(" ", "_")
      .replace(/:/g, "-");
    const fileBuffer = Buffer.from(data.trim(), "utf-8");
    const infoEmbed = new Discord.MessageEmbed()
      .setTitle(`Crash Report from: ${date}`)
      .setColor("RANDOM")
      .setURL("http://ludari.online/maple-server.log");
    const thread = await getThread(channel);
    thread.send({ embeds: [infoEmbed] });
    thread.send({
      files: [
        { attachment: fileBuffer, name: `ms2s_crashlog_${dateFileName}.txt` },
      ],
    });
  });

  tail.on("error", function (error) {
    console.log("ERROR: ", error);
  });
};

exports.logService = logService;
