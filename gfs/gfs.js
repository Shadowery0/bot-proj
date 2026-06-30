// A minimalist GeoFS interface
const axios = require("axios")

class Player {
  _self
  #_lmid
  
  constructor(body) {
    this._self = body
  }
  resolve() {
    return new Promise((resolve, reject) => {
      resolve(data)
    })
  }
}

class ClientPlayer extends Player {
  users = []
  async _tryCon() {
    try {
      const r = await axios.post("https://mps.geo-fs.com/update", this._self)
      console.log(r.data)
      return r
    } catch(e) {
      throw new Error("Request Rejected: " + e)
    }
  }
  init() {
    return new Promise((re, rj) => {
      let r = null;
      const _r = this._tryCon()
        .then(__r => { })
        .catch(e => console.error(e))
    })
  }
  constructor(acid, sid) {
    super({
      "origin": "https://www.geo-fs.com",
      "acid": acid,
      "sid": sid,
      "id": "",
      "ac": 1,
      "co": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      "ve": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      "st": {"gr": 1, "as": 0},
      "ro": {"ad": 0},
      "ti": Date.now() * 1000,
      "m": "",
      "ci": 0
    });
    
    this.init()
      .catch(e => console.error(e))
  }
}

class GFSManager {
  constructor(acid, sid) {
    return new ClientPlayer(acid, sid);
  }
}
module.exports = {
  GFSManager,
  Player
}