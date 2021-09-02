const { Listener } = require("@sapphire/framework");
const {
  blue,
  gray,
  green,
  magenta,
  magentaBright,
  white,
  yellow,
} = require("colorette");

const { logService } = require("../services/logService");

class UserEvent extends Listener {
  constructor(context, options = {}) {
    super(context, {
      ...options,
      once: true,
    });
  }

  async run() {
    this.printBanner();
    logService(this.container.client);
  }

  printBanner() {
    console.log(blue("Ludari Bot"));
  }
}

exports.UserEvent = UserEvent;
