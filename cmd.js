const fs = require("fs")
const path = require("path")
const { REST, Routes } = require("discord.js")
require("dotenv").config()

let cmd = []

(function rdSRecursion(currentDir) {
  let dir = fs.readdirSync(currentDir, { withFileTypes: true })
  
  dir = dir.filter(item => {
    return item.isDirectory() || item.name.endsWith(".js")
  })
  
  for (const item of dir) {
    if (item.isDirectory()) {
      rdSRecursion(path.join(currentDir, item.name))
    } else {
      const file = require(path.join(currentDir, item.name))
      cmd.push(file.data?.toJSON())
    }
  }
})(path.join(__dirname, "commands/"))

let rest = new REST().setToken(process.env.TOKEN)

console.log(`Found ${cmd.length} commands. Now performing PUT`)
rest.put(Routes.applicationGuildCommand(process.env.BOT_ID, process.env.CAEID), {body: cmd})
  .then(() => {console.log(`PUT OK, registration of ${cmd.length} to ${process.env.CAEID} done`)})
  .catch(_ => {console.log(`PUT FAILED: ${_.code}: ${_.data ?? "(no data providee)"}`)})