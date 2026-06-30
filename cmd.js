const fs = require("fs")
const path = require("path")
const { REST, Routes } = require("discord.js")
require("dotenv").config()

let cmd = []
let dir = fs.readdirSync(path.join(__dirname, "commands/"), {withFileTypes: true})

for(const item of dir) {
  if(item.isDirectory()) {
    
  } else {
    const file = require(path.join(__dirname, "commands", item.name))
    cmd.push(file.data?.toJSON())
  }
}

let rest = new REST().setToken(process.env.TOKEN)

rest.put(Routes.applicationGuildCommand(process.env.BOT_ID, process.env.CAEID), {body: cmd})