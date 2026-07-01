// Recursive functionality that supports custom logic
const fs = require("fs")
const path = require("path")
/**
 * @name rdSRecursion
 * Recursively perform a callback task on a directory
 * @param string Path to file. `path.join()` usage is recommended
 * @param {cb} Function
 */
function rdSRecursion(cD, cb) {
  let dir = fs.readdirSync(cD, { withFileTypes: true })
  
  // Ignore all other file types
  dir = dir.filter(item => {
    return item.isDirectory() || item.name.endsWith(".js")
  })
  
  for (const item of dir) {
    if (item.isDirectory()) {
      rdSRecursion(path.join(cD, item.name))
    } else {
      if(typeof cb !== "function") throw new TypeError("The provided callback is not a function.")
      cb(cD, item)
    }
  }
}

/**
 * @param string Current directory of the current recursive operation/file
 * @param Dirent Dirent return of a method
 * @callback cb
 */
 
 module.exports = rdSRecursion