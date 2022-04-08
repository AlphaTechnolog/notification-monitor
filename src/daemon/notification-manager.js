module.exports = class NotificationManager {
  constructor (notification) {
    this.notification = notification
  }

  parseBody () {
    const { body } = this.notification
    const [ app, , , title, description ] = body

    return {
      app,
      title,
      description
    }
  }
}