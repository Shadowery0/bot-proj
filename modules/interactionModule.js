const rdsr = require("../recursive.js")
const path = require("path")

module.exports = {
  name: "Interaction Module",
  event: "interactionCreate",
  handler: (i) => {
    console.debug("Received an interaction from user calling " + i.member.id +" | " + i.commandName)
    cmd.forEach(_ => {
      if(_.name === i.commandName) {
        // It's up to you to handle the command, not me, I'm a loader!
        _.handler(i)
      }
    })
  },
  init: () => {
    rdsr(path.join("../", "commands/"), (cd, f) => {
      const _ = require(path.join(cd, f.name))
      if (
        _?.data === undefined || !(_?.data instanceof SlashCommandBuilder) ||
        _?.handler === undefined || typeof _?.handler !== "function"
      ) {
        throw new TypeError(`Invalid command file: ${f.name}`)
      } else {
        console.log("Registered command file " + f.name)
        cmd.push({ name: _.data.name, handler: _.handler })
      }
    })
  }
}