module.exports = {
  name: "ping",
  aliases: ["pi"],
  description: "Checks if the bot is working or not",
  async execute(message) {
      if (message.content === 'ping') {
            return message.channel.send("**Pong!**").catch(console.error);
    }
  }
};