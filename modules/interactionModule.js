const rdsr = require("../recursive.js")

module.exports = {
  name: "Interaction Module",
  event: "interactionCreate",
  handler: (i) => {
    console.debug("Received an interaction from user calling " + i.member.id +" | " + i.commandName)
    cmd.forEach(_ => {
      if(_.name === i.commandName) {
        _.handler(i)
      }
    })
  },
  init: () => {
    rdsr(path.join(__dirname, "commands/"), (cd, f) => {
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