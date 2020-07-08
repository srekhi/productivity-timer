const { app, Menu, Tray, BrowserWindow } = require('electron')
const path = require("path")
const alarmPng = path.join(__dirname, "images/alarm.png")
const sleep = path.join(__dirname, "images/sleep.png")

var timeElapsed = 0;
var timerID = -1;

function tick() {
    timeElapsed++
    document.getElementById("timer").innerHTML = timeElapsed;
}

function start() {
    if(timerID == -1){
        timerID = setInterval(tick, 1000);
    }
}

function stop() {
    if(timerID != -1){
        clearInterval(timerID)
        timerID = -1
    }
}

function reset() {
    stop();
    timeElapsed = -1;
    tick()
}

app.on('ready', () => {
  app.dock.hide()
  const tray = new Tray(alarmPng)
  startTimer = () => { 
    tray.setImage(alarmPng)
  }

  stopTimer = () => { 
    tray.setImage(sleep)
  }

  seeTime = () => {
    const win = new BrowserWindow({ width: 800, height: 600 })
    win.loadURL(`file://${__dirname}/index.html}`)
  }
  
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Start time', type: 'radio', click: startTimer },
    { label: 'Stop time', type: 'radio', click: stopTimer },
    { label: 'How long have I worked?', type: 'normal', click: seeTime },
  ])
  tray.setContextMenu(contextMenu)
});
