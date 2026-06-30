const { GFSManager } = require("./gfs.js")

const player = new GFSManager(1653622)
player.on("clientPoll", () => console.log("Poll'd"))
player.on("mapUpdate", _ => console.log(_))