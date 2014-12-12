#! /usr/bin/env bash

menuStart='open -b com.code42.b42menuextra'
menuBar="$(ps aux | grep 'CrashPlan menu bar.app' | grep -v grep | awk -F' ' '{print $2}')"

case "$1" in
    start)
        sudo launchctl load /Library/LaunchDaemons/com.crashplan.engine.plist
		launchctl start com.crashplan.engine
		$menuStart
		echo "Started Successfully"
        ;;
    stop) 
        launchctl stop com.crashplan.engine
		sudo launchctl unload /Library/LaunchDaemons/com.crashplan.engine.plist
		[ $menuBar ] && kill $menuBar
		echo "Stopped Successfully"
		;;
   restart)
        launchctl stop com.crashplan.engine
		sudo launchctl unload /Library/LaunchDaemons/com.crashplan.engine.plist
		[ $menuBar ] && sudo kill $menuBar
        echo "Stopped... Starting it again"
        
        sudo launchctl load /Library/LaunchDaemons/com.crashplan.engine.plist
		launchctl start com.crashplan.engine
		$menuStart
        ;;
        *)
        echo "Usage: crashPlan start|stop|restart"
        exit 1
        ;;
    esac