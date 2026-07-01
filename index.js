const { Client, GatewayIntentBits } = require("discord.js")
const path = require("path")
consr rdsr = require("./recursive")
const { Chalk } = require("chalk")
const { GFSManager } = require("./gfs/gfs.js")
require("dotenv").config()
const chalk = new Chalk({level: 2})

class BotWrapper {
  client = new Client({intents: 3191159});
  // geofs = new GFSManager(1653622);
  
  constructor(token) {
    // Login
    this.client.login(token)
      .then(_ => {console.debug("Logged in! Now I am " + this.client.user.tag + " or "+ this.client.user.id)})
      .catch(console.error)
    // this.client.on("debug", _ => {console.debug(_)})
    this.client.on("clientReady", () => {
      rdsr(path.join(__dirname, "modules"), f => {
        if (
          const _ = require(f)
          _?.event === undefined || _?.handler === undefined ||
          typeof _?.event !== "string" || typeof _?.handler !== "function"
        ) {
          throw new TypeError(`Module file ${f.name} does not have valid data.`)
        } else {
          console.log(`Successfully loaded module "${_?.name ?? f.name}"`)
          this.client.on(_.event, _.handler)
        }
      })
    })
  }
}

module.exports = new BotWrapper(process.env.TOKEN)