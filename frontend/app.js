const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 675
  })

  win.loadFile('dist/frontend/index.html')
}

app.whenReady().then(() => {
  createWindow()
})
