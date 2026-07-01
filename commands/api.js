const { SlashCommandBuilder } = require('discord.js')
const path = require("path")
const bot = require(path.resolve(__dirname, "../", "index.js"))

module.exports = {
  handler: async (i) => {
    await i.deferReply()
    await i.editReply(`There are ${bot.geofs.map.getPlayerCount()} players online`)
  },
  data: new SlashCommandBuilder()
    .setName("api")
    .setDescription("Fetch information from GeoFS API")
}