const { Client, GatewayIntentBits } = require("discord.js")
const { PassThrough, Writable } = require("stream")
const { Chalk } = require("chalk")
const { GFSManager } = require("./gfs/gfs.js")
require("dotenv").config()
const chalk = new Chalk({level: 2})

class BotWrapper {
  client = new Client({intents: 3191159});
  // geofs = new GFSManager(1653622);
  
  constructor(token) {
    this.client.login(token)
      .then(_ => {console.debug("Logged in! Now I am " + this.client.user.tag + " or "+ this.client.user.id)})
      .catch(console.error)
    this.client.on("debug", _ => {console.debug(_)})
    this.client.on("ready", () => {
      
    })
  }
  initGFSClient(id, sid) {
    return this.geofs.tryLogin({id, sid})
  }
}

module.exports = new BotWrapper(process.env.TOKEN)