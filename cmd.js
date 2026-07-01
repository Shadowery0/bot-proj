const fs = require("fs")
const path = require("path")
const { REST, Routes } = require("discord.js")
require("dotenv").config()

let cmd = []
let dir = fs.readdirSync(path.join(__dirname, "commands/"), {withFileTypes: true})

for(const item of dir) {
  if(item.isDirectory()) {
    // later
  } else {
    const file = require(path.join(__dirname, "commands", item.name))
    cmd.push(file.data?.toJSON())
  }
}

let rest = new REST().setToken(process.env.TOKEN)

console.log(`Found ${cmd.length} commands. Now performing PUT`)
rest.put(Routes.applicationGuildCommand(process.env.BOT_ID, process.env.CAEID), {body: cmd})
  .then(() => {console.log(`PUT OK, registration of ${cmd.length} to ${process.env.CAEID} done`)})
  .catch(_ => {console.log(`PUT FAILED: ${_.code}: ${_.data ?? "(no data providee)"}`)})