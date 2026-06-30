const { GFSManager } = require("./gfs.js")

const player = new GFSManager(1653622)
player.map.on("update", () => console.log("updated map event"))