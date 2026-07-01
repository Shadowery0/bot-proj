const { SlashCommandBuilder } = require('discord.js')
const bot = require(path.resolve(__dirname, "../", "index.js"))
module.exports = {
  handler: (i) => {
    i.deferReply()
    i.editReply(`There are ${bot.geofs.map.getPlayerCount()} players online`)
  },
  data: new SlashCommandBuilder()
    .setName("api")
    .setDescription("Fetch information from GeoFS API")
}