const { Listener } = require("@sapphire/framework");
const { logService } = require("../services/logService");

class UserEvent extends Listener {
  constructor(context, options = {}) {
    super(context, {
      ...options,
    });
  }

  async run(message) {
    if (message.channel.name !== "updates") return;
    if (message.embeds.length > 0) {
      if (message.embeds[0].fields.length > 0) {
        if (!message.embeds[0].fields[0].value.includes("New comment on"))
          return;
      }
      console.log("not comment");
      message
        .crosspost()
        .then(() => console.log("published message"))
        .catch((error) => console.log("error publishing message", error));
    }
  }
}

exports.UserEvent = UserEvent;
