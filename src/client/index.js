const fs = require('fs')
const path = require('path')

const notifBackend = () => {
  const storage = path.join(__dirname, '..', '..', 'storage.json')

  if (!fs.existsSync(storage)) {
    fs.writeFileSync(storage, '')
  }

  const noNotif = () => {
    console.log('No notifications available')
    process.exit(0)
  }

  const content = fs.readFileSync(storage).toString()

  if (content === '') {
    noNotif()
  }

  const { notifications } = JSON.parse(content)

  if (notifications.length === 0) {
    noNotif()
  }

  return notifications
}

const getNotifications = () => {
  const notifications = notifBackend()
  console.log('Notifications:')
  for (const notification of notifications) {
    console.log(`-> ${notification.app}: ${notification.title}${notification.description ? ' (' + notification.description + ')' : ''}`)
  }
}

const checkToRead = () => {
  const notifications = notifBackend()
  if (notifications.length > 0) {
    console.log(`You have ${notifications.length} notifications!`)
  }
}

const help = () => {
  const choices = ['get-notifications', 'check-toread']
  console.log(`Available subcommands: ${choices.join(', ')}`)
  console.log('usage: remote-notifmonitor <subcommand>')
  process.exit(0)
}

const main = () => {
  const argv = process.argv.slice(2)
  const [subcommand] = argv
  const choices = ['get-notifications', 'check-toread']
  if (subcommand === 'help') {
    help()
  }
  if (!subcommand || !choices.includes(subcommand)) {
    console.error('Invalid subcommand')
    help()
  }

  if (subcommand === choices[0]) {
    getNotifications()
  } else if (subcommand === choices[1]) {
    checkToRead()
  }
}

if (require.main === module) {
  main()
}