#!/bin/bash

ROOTUID="0"

if [ "$(id -u)" -eq "$ROOTUID" ] ; then
  if test -d /opt/notifications-monitor; then
      echo "Already exists another installation of notifications-monitor in /opt/notifications-monitor, removing to reinstall..."
      rm -rf /opt/notifications-monitor
  fi

  if test -f /usr/bin/remote-notifmonitor; then
      echo "Removing launcher remote-notifmonitor"
      rm /usr/bin/remote-notifmonitor
  fi

  if test -f /usr/bin/notifmonitord; then
      echo "Removing launcher notifmonitord"
      rm /usr/bin/notifmonitord
  fi

  cd $(dirname $0)/../

  echo "Copying source code"
  mkdir -p /opt/notifications-monitor
  cp -r ./* /opt/notifications-monitor

  echo "Creating launchers"
  cp -r /opt/notifications-monitor/bin/launchers/* /usr/bin
  chmod +x /usr/bin/{notifmonitord,remote-notifmonitor}

  echo "Giving permissions to your user"
  chown -R $(whoami):$(whoami) /opt/notifications-monitor

else # No root access, tries again
  echo "This script needs root access to proceed to the installation."
  if command -v sudo; then
    echo "Running with sudo, please give the password :"
    sudo "${BASH_SOURCE}"
  elif command -v doas; then
    echo "Running with doas, please give the password :"
    doas "${BASH_SOURCE}"
  else
    echo "Please run the script with a sudo-like utility or with root."
  fi
fi
