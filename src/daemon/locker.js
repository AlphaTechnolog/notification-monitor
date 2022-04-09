const fs = require('fs')
const path = require('path')

class Locker {
  constructor () {
    this.lockFile = path.join(__dirname, '..', '..', 'daemon.lck')
  }

  _startHook () {
    if (this.existsLckFile()) {
      console.error('lock file already exists, this means this daemon is already running, if you know what are you doing, remove: ' + this.lockFile)
      process.exit(1)
    } else {
      this.createLckFile()
    }
  }

  existsLckFile () {
    return fs.existsSync(this.lockFile)
  }

  createLckFile () {
    // create lck file
    fs.writeFileSync(this.lockFile, '')
  }

  exitHandler () {
    // remove lock file
    const lockFile = path.join(__dirname, '..', '..', 'daemon.lck')
    fs.rmSync(lockFile)
  }

  _runEvents () {
    // so the program will not close instantly
    process.stdin.resume();

    // do something when app is closing
    process.on('exit', () => 'break');

    // catches ctrl+c event
    process.on('SIGINT', this.exitHandler);

    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', this.exitHandler);
    process.on('SIGUSR2', this.exitHandler);

    // catches uncaught exceptions
    process.on('uncaughtException', () => 'break');
  }
}

const locker = new Locker()

locker._runEvents()

module.exports = locker
