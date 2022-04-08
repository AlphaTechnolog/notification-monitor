const path = require('path')
const fs = require('fs')

class Storage {
  constructor () {
    this._storage = {}
  }

  _rewrite_history () {
    fs.writeFileSync(path.join(__dirname, '..', '..', 'storage.json'), JSON.stringify(
      this._storage
    ))
  }

  append (key, val) {
    this._storage[key] = val
    this._rewrite_history()
  }

  getval (key) {
    this._rewrite_history()
    return this._storage[key]
  }

  createStorageMonitor (key, cb, time = 1000) {
    setInterval(() => {
      cb(this.getval(key))
    }, time)
  }
}

module.exports = new Storage()