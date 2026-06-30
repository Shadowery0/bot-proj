const fs = require("fs")
const path = require("path")
const { REST, Routes } = require("discord.js")
require("dotenv").config()

let cmd = []
let dir = fs.readdirSync(path.join(__dirname, "commands/"))

for(item in dir) {
  console.log(item)
}