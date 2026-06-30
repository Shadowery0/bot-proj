// A minimalist GeoFS interface
const axios = require("axios")
const { EventEmitter } = require("events")
const MPS = "https://mps.geo-fs.com/update"
const header = {
  "Origin": "https://www.geo-fs.com",
  "Referer": "https://www.geo-fs.com/geofs.php",
  "User-Agent": "Mozilla/5.0"
}

class Player {
  _self
  data
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
      const one = await axios.post(MPS, this._self, {headers: header})
      console.log("First poll OK")
      
      this._self.id = one?.data.myId ?? ""
      this._self.ci = 0
      this._self.ti = Date.now() * 1000
      await new Promise(_ => setTimeout(_, 5000))
      
      const r = await axios.post(MPS, this._self, {headers: header})
      this._self.lastMsgId = r.data.lastMsgId
      return r
      
    } catch(e) {
      throw new Error("Request Rejected: " + e.code + "\n" + e.data)
    }
  }
  _init() {
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
  constructor(acid) {
    super({
      "origin": "https://www.geo-fs.com",
      "acid": acid,
      "sid": "gqgn2t3qahcoo2tkghuu00l9ps",
      "id": "",
      "ac": 1,
      "co": Array(6).fill(0),
      "ve": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      "st": {"gr": 1, "as": 0},
      "ro": {"ad": 0},
      "ti": Date.now() * 1000,
      "m": "",
      "ci": 0
    });
  }
  init() {
    return new Promise((re, rj) => {
      this._init()
        .then(_ => {
          this.events.emit("ready", _)
          setInterval(() => {
            console.log("[CHK >> GeoFS API] API Poll")
            this.#poll(this._self)
              .then(_ => {
                console.log("[CHK >> GeoFS API] OK, " + _.users?.length + " players vs the reported of " + _.userCount)
                console.log(JSON.stringify(_, null, 4))
                this.events.emit("poll", _)
                re(this)
              })
              .catch(_ => {
                console.error("[CHK XX GeoFS] FAILED!")
                rj(false)
              })
          }, 5000)
        })
        .catch(false)
    })
    
  }
  #poll() {
    return new Promise((re, rj) => {
      axios.post(MPS, this._self, {headers: header})
        .then(r => {
          if (!!r?.data && r?.data !== undefined && r?.data !== "" && r?.data !== null) {
            re(r.data)
            this._self["id"] = r.data.myId ?? ""
          } else rj(null)
        })
        .catch(rj)
    })
  }
  grabId() {
    return this._self.id
  }
  sendMessage(m) {
    this._self.m = m
    return new new Promise((re, rj) => {
      axios.post(MPS, this._self, {headers: header})
        .then(_ => {
          console.log(JSON.stringify(_, null, 4))
        })
        .catch(_ => {
          console.error("Failed!")
        })
    })
  }
}

class MapManager extends EventEmitter
{
  _self;
  map;
  constructor(myId) {
    super()
    console.log("MapManager initialized")
    this._self = {id: myId.toString(), gid: ""}
    setInterval(() => {
      axios.post(MPS, this._self, {headers: header})
        .then(_ => {this.emit("update", _.data); this.map = _; console.log("Pulled MAP OK")})
    }, 5000)
  }
}

class GFSManager extends EventEmitter{
  client;
  map;
  users = []
  constructor(acid) {
    super()
    this.client = new ClientPlayer(acid)
    this.client.init()
      .then(_ => {
        this.map = new MapManager(_.grabId())
        this.client.events.on("ready", _ => this.emit("clientReady", _))
        this.client.events.on("poll", _ => this.emit("clientPoll", _))
        this.map.on("update", _ => this.emit("mapUpdate", _))
      })
  }
  
  destroy() {
    
  }
}
module.exports = {
  GFSManager,
  Player
}