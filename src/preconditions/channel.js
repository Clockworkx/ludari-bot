const { Precondition } = require("@sapphire/framework");

module.exports = class ChannelPrecondition extends Precondition {
  constructor(context) {
    super(context, { position: 11 });
  }
  run(message) {
    console.log(message);
    if (message.channel.id !== "882597187396194367")
      return this.error(this.name, "Nono");
    return this.ok();
  }
};
