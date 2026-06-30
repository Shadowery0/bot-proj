// A minimalist GeoFS interface
const axios = require("axios")

class Player {
  #_self
  #_lmid
  
  constructor(body) {
    this.#self = body
  }
  resolve() {
    return new Promise((resolve, reject) => {
      resolve(data)
    })
  }
}

class ClientPlayer extends Player {
  users = []
  
  constructor(acid, sid) {
    super({
      "origin": "https://www.geo-fs.com",
      "acid": acid,
      "sid": sidd,
      "id": "",
      "ac": "1",
      "co": [9999999999999999]*6,
      "ve": [0.0]*6,
      "st": {"gr": True, "as": 0},
      "ti": int(time.time() * 1000),
      "ac": 1,
      "co": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      "ve": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      "st": {"gr": 1, "as": 0},
      "ro": {"ad": 0},
      "ti": int(time.time() * 1000),
      "m": "",
      "ci": 0
    })
    
    axios.post("https://mps.geo-fs.com/update", this.#_self.toJSON())
      .then(r => {
        console.log(r.toJSON())
      })
      .catch(e => {
        throw new Error("Request failed! " + e)
      })
      
    return new Promise((re, rj) => {
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