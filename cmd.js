const fs = require("fs")
const path = require("path")
const rdsr = require("./recursive")
const { REST, Routes, SlashCommandBuilder } = require("discord.js")
require("dotenv").config()

let cmd = []

rdsr(path.resolve("./", "commands/"), (cd, f) => {
  const _ = require(path.join(cd, f.name))
  if(_?.data === undefined || !(_?.data instanceof SlashCommandBuilder)) {
    throw new TypeError(`Command file ${f.name} does not have a valid SlashCommandBuilder data.`)
  } else {
    cmd.push(_.data.toJSON())
  }
})

let rest = new REST().setToken(process.env.TOKEN)

console.log(`Found ${cmd.length} commands. Now performing PUT`)
rest.put(Routes.applicationGuildCommands(process.env.BOT_ID, process.env.CAEID), {body: cmd})
  .then(() => {console.log(`PUT OK, registration of ${cmd.length} to ${process.env.CAEID} done`)})
  .catch(_ => {console.log(`PUT FAILED: ${_.code}: ${_.toString()}`)})