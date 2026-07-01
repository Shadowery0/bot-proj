module.exports = {
  name: "Interaction Module",
  event: "interactionCreate",
  handler: (i) => {
    console.log("Received an interaction from user " + i.member.id)
    i.deferReply()
      .then(_ => i.editReply("Test"))
  }
}