#!/bin/bash

echo "Using sudo for some actions, please give the password"\

if test -d /opt/notifications-monitor; then
    echo "Already exists another installation of notifications-monitor in /opt/notifications-monitor, removing to reinstall..."
    sudo rm -rf /opt/notifications-monitor
fi

if test -f /usr/bin/remote-notifmonitor; then
    echo "Removing launcher remote-notifmonitor"
    sudo rm /usr/bin/remote-notifmonitor
fi

if test -f /usr/bin/notifmonitord; then
    echo "Removing launcher notifmonitord"
    sudo rm /usr/bin/notifmonitord
fi

cd $(dirname $0)/../

echo "Copying source code"
sudo mkdir -p /opt/notifications-monitor
sudo cp -r ./* /opt/notifications-monitor

echo "Creating launchers"
sudo cp -r /opt/notifications-monitor/bin/launchers/* /usr/bin
sudo chmod +x /usr/bin/{notifmonitord,remote-notifmonitor}

echo "Giving permissions to your user"
sudo chown -R $(whoami):$(whoami) /opt/notifications-monitor