// A minimalist GeoFS interface
const axios = require("axios")
const { EventEmitter } = require("events")
const MPS = "https://mps.geo-fs.com/update"

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
  events = new EventEmitter()
  async _tryCon() {
    try {
      const r = await axios.post(MPS, this._self)
      console.log(r.data)
      return r
    } catch(e) {
      throw new Error("Request Rejected: " + e)
    }
  }
  init() {
    return new Promise((re, rj) => {
      this._tryCon()
        .then(_r => { 
          if(!!_r?.data && _r?.data !== undefined && _r?.data !== "" && _r?.data !== null) {
            re(_r)
            console.log("Connected to GeoFS. I am " + _r.data.myId)
            this._self["id"] = _r.data.myId ?? ""
          } else {
            console.log("Null resp.")
            rj(null)
          }
        })
        .catch(e => rj(e))
    })
  }
  constructor(acid, sid) {
    super({
      "origin": "https://www.geo-fs.com",
      "acid": acid,
      "sid": sid,
      "id": "",
      "ac": 1,
      "co": Array(6).fill(50),
      "ve": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      "st": {"gr": 0, "as": 0},
      "ro": {"ad": 0},
      "ti": Date.now() * 1000,
      "m": "",
      "ci": 0
    });
    
    this.init()
      .then(_ => { 
        this.events.emit("ready", _)
        setInterval(() => {
          console.log("[CHK >> GeoFS API] API Poll")
          this.#poll(this._self)
            .then(_ => {
              console.log("[CHK >> GeoFS API] OK, " + _.users?.length + " players vs the reported of " + _.userCount)
              console.log(_)
              this.events.emit("poll", _)
            })
            .catch(_ => {
              console.error("[CHK XX GeoFS] FAILED!")
            })
        }, 5000)
      })
      .catch(e => console.error(e))
  }
  
  #poll() {
    return new Promise((re, rj) => {
      this._self["m"] = "Hello World"
      axios.post(MPS, this._self)
        .then(r => {
          if (!!r?.data && r?.data !== undefined && r?.data !== "" && r?.data !== null) {
            re(r.data)
            this._self["id"] = r.data.myId ?? ""
          } else rj(null)
        })
        .catch(rj)
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