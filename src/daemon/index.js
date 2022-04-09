const dbus = require('dbus-next')
const bus = dbus.sessionBus();
const NotificationManager = require('./notification-manager')
const storageManager = require('./storage')
const locker = require('./locker')

// lock files
locker._startHook()

// ---------CONFIGURATION------------

const VERBOSE = false // use false before run install.sh please
const CLEANUP_TIME = 300000 // -> 5 minutes

// ----------------------------------

const verboseLog = msg => {
  if (VERBOSE) {
    console.clear()
    console.log(msg)
  }
}

const main = () => {
  storageManager.append('notifications', [])

  bus.getProxyObject('org.freedesktop.DBus', '/org/freedesktop/DBus').then((obj) => {
    let monitor = obj.getInterface('org.freedesktop.DBus.Monitoring');

    monitor.BecomeMonitor([
      "type='signal',member='Notify',path='/org/freedesktop/Notifications',interface='org.freedesktop.Notifications'",
      "type='method_call',member='Notify',path='/org/freedesktop/Notifications',interface='org.freedesktop.Notifications'",
      "type='method_return',member='Notify',path='/org/freedesktop/Notifications',interface='org.freedesktop.Notifications'",
      "type='error',member='Notify',path='/org/freedesktop/Notifications',interface='org.freedesktop.Notifications'"
    ], 0);


    bus.on('message', (notification) => {
      if (notification.type === 1) { // system notification
        const manager = new NotificationManager(notification)
        storageManager.append('notifications', [...storageManager.getval('notifications'), manager.parseBody()])
      }
    });
  });

  storageManager.createStorageMonitor('notifications', notifications => {
    // cleaning first notification
    verboseLog('Cleaning first notification...')
    storageManager.append('notifications', notifications.slice(1))
  }, CLEANUP_TIME)

  if (VERBOSE) {
    storageManager.createStorageMonitor('notifications', notifications => {
      if (notifications.length > 0) {
        console.clear()
        console.log('notifications', notifications)
      }
    })
  }
}

if (require.main == module) {
  main()
}
