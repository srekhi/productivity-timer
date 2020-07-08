const path = require("path")
const { app, Menu, Tray } = require('electron')

const alarmPng = path.join(__dirname, "images/alarm.png")
const sleepPng = path.join(__dirname, "images/sleep.png")

app.on('ready', () => {
  app.dock.hide()
  const tray = new Tray(sleepPng)

  let timeElapsed = 0;
  let timerID = -1;
  let showRunningTime = false; 

  tick = () => {
    timeElapsed++
    if (showRunningTime) { 
        const timeStr = new Date(timeElapsed * 1000).toISOString().substr(11, 8);
        tray.setTitle(timeStr);
    }
  }

  startTimer = () => { 
    tray.setImage(alarmPng)
    if(timerID == -1){
      timerID = setInterval(tick, 1000);
    }
  }

  stopTimer = () => { 
    tray.setImage(sleepPng)
    if(timerID != -1) {
      clearInterval(timerID)
      timerID = -1
    }
  }

  toggleTimeDisplay = () => {
      showRunningTime = !showRunningTime
      if (!showRunningTime) { 
        tray.setTitle("")
      }
  }

  resetTimer = () => {
    stopTimer();
    timeElapsed = -1;
    tick()
  }
  
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Start time', type: 'radio', click: startTimer  },
    { label: 'Stop time', type: 'radio', click: stopTimer, checked: true },
    { label: "Toggle time display", type: 'normal', click: toggleTimeDisplay },
    { label: 'Reset time', type: 'normal', click: resetTimer },
  ])
    tray.setContextMenu(contextMenu)
});