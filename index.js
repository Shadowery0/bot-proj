// Loader
const { Client, GatewayIntentBits } = require("discord.js")
const path = require("path")
const rdsr = require("./recursive")
const { Chalk } = require("chalk")
const { GFSManager } = require("./gfs/gfs.js")
require("dotenv").config({path: path.resolve("./",".env")})
const chalk = new Chalk({level: 2})

class BotWrapper {
  client = new Client({intents: 3191159});
  geofs = new GFSManager();
  
  constructor(token) {
    // Login
    this.client.login(token)
      .then(_ => {console.debug("Logged in! Now I am " + this.client.user.tag + " or "+ this.client.user.id)})
      .catch(console.error)
    // this.client.on("debug", _ => {console.debug(_)})
    this.client.on("clientReady", () => {
      rdsr(path.join(__dirname, "modules"), (cd, f) => {
        const _ = require(path.join(cd, f.name))
        if (
          _?.event === undefined || _?.handler === undefined || _?.init === undefined ||
          typeof _?.event !== "string" || typeof _?.handler !== "function" ||
          typeof _?.init !== "function"
        ) {
          throw new TypeError(`Module file ${f.name} does not have valid data.`)
        } else {
          console.log(`Successfully loaded module "${_?.name ?? f.name}"`)
          _.init()
          this.client.on(_.event, _.handler)
        }
      })
    })
    this.geofs.init()
  }
}

module.exports = new BotWrapper(process.env.TOKEN)