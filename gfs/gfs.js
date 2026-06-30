// A minimalist GeoFS interface
const axios = require("axios")

class Player {
  _self
  #_lmid
  
  constructor(body) {
    this.#_self = body
  }
  resolve() {
    return new Promise((resolve, reject) => {
      resolve(data)
    })
  }
}

class ClientPlayer extends Player {
  users = []
  async #tryCon() {
    try {
      const r = (await axios.post("https://mps.geo-fs.com/update", this._self.toJSON())).toJSON()
      console.log(r)
      return r
    } catch(e) {
      throw new Error("Request Rejected: " + e)
    }
  }
  
  constructor(acid, sid) {
    super({
      "origin": "https://www.geo-fs.com",
      "acid": acid,
      "sid": sid,
      "id": "",
      "ac": "1",
      "co": [9999999999999999]*6,
      "ve": [0.0]*6,
      "st": {"gr": true, "as": 0},
      "ti": int(time.time() * 1000),
      "ac": 1,
      "co": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      "ve": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      "st": {"gr": 1, "as": 0},
      "ro": {"ad": 0},
      "ti": int(Date.now() * 1000),
      "m": "",
      "ci": 0
    };
    
    return new Promise((re, rj) => {
      const r = this.#tryCon()
      if(!!r) {
        re(r)
      } else {
        rj("Null response")
      }
    })
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