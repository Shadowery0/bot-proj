const { Client, GatewayIntentBits } = require("discord.js")
const { PassThrough, Writable } = require("stream")
const { Chalk } = require("chalk")
const { GFSManager } = require("./gfs/gfs.js")
require("dotenv").config()
const chalk = new Chalk({level: 2})

class SimpleLogger {
  stream
  fstream
  constructor(_csl, _fle) {
    if(!(_fle instanceof Writable)) {
      _fle = new PassThrough()
    }
    this.stream = _csl
    this.fstream = _fle
  }
  error(data) {
    this.stream.error(chalk.bgRed.white(`[ERR] [${new Date().toISOString()}]`) + " " + data.toString())
    fstream.write(`[ERR] [${new Date().toISOString()}] ` + data.toString())
  }
  warn(data) {
    this.stream.warn(chalk.bgYellowBright.white(`[WARN] [${new Date().toISOString()}]`)+ " " + data.toString())
    fstream.write(`[WARN] [${new Date().toISOString()}] ` + data.toString())
  }
  info(data) {
    this.stream.log(chalk.bgGray.black(`[INFO] [${new Date().toISOString()}]`) + " " + data.toString())
    fstream.write(`[INFO] [${new Date().toISOString()}] ` + data.toString())
  }
  debug(data) {
    this.stream.debug(chalk.bgCyan.white(`[DBG] [${new Date().toISOString()}]`) + " " + data.toString())
    fstream.write(`[DBG] [${new Date().toISOString()}] ` + data.toString())
  }
}

class BotWrapper {
  client = new Client({intents: 3191159});
  logger = new SimpleLogger(console);
  // geofs = new GFSManager(1653622);
  
  constructor(token) {
    this.client.login(token)
      .then(_ => {console.debug("Logged in! Now I am " + this.client.user.tag + " or "+ this.client.user.id)})
      .catch(console.error)
    this.client.on("debug", _ => {console.debug(_)})
  }
  initGFSClient(id, sid) {
    return this.geofs.tryLogin({id, sid})
  }
}

const bot = new BotWrapper(process.env.TOKEN)
bot.client.on("ready", _ => {
  bot.client.users.fetch('1240898665510473768', { force: true })
    .then((_) => {
      let cnt = 0
      let time = Date.now()
      console.log("Fetch OK")
      setInterval(async () => {
        await _.send("u asked for it " + cnt)
        if(cnt % 10 === 0) {
          console.log("tenth op logged, currently " + cnt + ", took " + (Date.now() - time).toString() + "ms")
        }
        cnt++
        time = Date.now()
      }, 300)
    })
})