const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');

  // 👉 OPEN DEV TOOLS (VERY IMPORTANT FOR DEBUG)
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);