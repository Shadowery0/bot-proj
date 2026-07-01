const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  handler: (i) => {i.reply("tsk tsk")},
  data: new SlashCommandBuilder()
    .setName("haha")
    .setDescription("huhu")
}