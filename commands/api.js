const { SlashCommandBuilder } = require('discord.js')
const path = require("path")
const bot = require(path.resolve(__dirname, "../", "index.js"))

module.exports = {
  handler: async (i) => {
    await i.deferReply()
    if(bot.geofs?.map === undefined || bot.geofs?.map === null) {
      i.editReply("Please try again.")
    }
    await i.editReply(`There are ${bot.geofs.map.getPlayerCount()} players online`)
  },
  data: new SlashCommandBuilder()
    .setName("api")
    .setDescription("Fetch information from GeoFS API")
}