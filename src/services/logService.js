const Discord = require("discord.js");
const { SapphireClient } = require("@sapphire/framework");
Tail = require("tail").Tail;

const logPath = "C:/Users/Marco/Desktop/New folder (4)/test.txt";

const logService = function (client) {
  console.log(logPath + "latestLog");
  const guild = client.guilds.cache.find(
    (guild) => guild.id === "783045053501276170"
  );
  const channel = guild.channels.cache.find(
    (channel) => channel.id === "877971006902382614"
  );

  logWatcher(channel);
};

const threadManager = async (channel) => {
  const existingThread = channel.threads.cache.find(
    (thread) => thread.name === "Crash Logs"
  );
  if (existingThread === undefined) {
    const thread = await channel.threads.create({
      name: "Crash Logs",
      autoArchiveDuration: 60 * 24,
    });
    return thread;
  }
  return existingThread;
};

const getThread = async (channel) => {
  const thread = await threadManager(channel);
  if (thread.archived) {
    await thread.setArchived(false);
  }
  if (thread.locked) {
    console.log("Thread is locked");
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
    //  console.log("data: ", data.trim());

    // if (
    //   ["test"].some((e) => {
    //     data.includes(e);
    //   })
    // ) {
    //   console.log("IN Channel Select", data);
    //   if (data.includes("stuck")) {
    //     console.log("STUCK!");
    //   }
    // }
    const date = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/-/g, "/")
      .replace("T", " ");
    const fileBuffer = Buffer.from(data.trim(), "utf-8");
    const infoEmbed = new Discord.MessageEmbed()
      .setTitle(`Crash Report from: ${date}`)
      .setColor("RANDOM");

    const thread = await getThread(channel);
    thread.send({ embeds: [infoEmbed] });
    thread.send({
      files: [{ attachment: fileBuffer, name: "file.txt" }],
    });
  });

  tail.on("error", function (error) {
    console.log("ERROR: ", error);
  });
};

exports.logService = logService;
