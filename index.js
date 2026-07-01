const { Client, GatewayIntentBits } = require("discord.js")
const path = require("path")
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
    this.client.on("clientReady", () => {
      function rdSRecursion(currentDir) {
        let dir = fs.readdirSync(currentDir, { withFileTypes: true })
        
        dir = dir.filter(item => {
          return item.isDirectory() || item.name.endsWith(".js")
        })
        
        for (const item of dir) {
          if (item.isDirectory()) {
            rdSRecursion(path.join(currentDir, item.name))
          } else {
            const file = require(path.join(currentDir, item.name))
            client.on(file.event, file.handler)
            console.log("Successfully registered module " + file.name)
          }
        }
      }
      rdSRecursion(path.join(__dirname, "modules"))
    })
  }
}

module.exports = new BotWrapper(process.env.TOKEN)