# Notifications Monitor

Monitorize your notifications and get a temporary list of the notifications.

## Installation

You can install this using this commands:

```sh
git clone https://github.com/AlphaTechnolog/notifications-monitor.git notifications-monitor
cd notifications-monitor
./bin/install.sh
```

> Give sudo password if is necesary

## Usage

First in a terminal start the daemon with the `notifmonitord` launcher (it's autoinstalled in `/usr/bin`):

```sh
notifmonitord &
```

> If VERBOSE config variable is true, it can't be executed in background :v

> VERBOSE by default is false, to change it, modify the file `notifications-monitor/src/daemon/index.js` and then reinstall

In a second terminal, you can get the details of the notifications using the `remote-notifmonitor` launcher, that are autoinstalled too:

### Get help

```sh
remote-notifmonitor help
```

### Get notifications list

```sh
remote-notifmonitor get-notifications
```

### Get number of notifications only

```sh
remote-notifmonitor check-toread
```