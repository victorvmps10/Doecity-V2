const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "DoeCity",
    icon: path.join(__dirname, 'assets', 'logo.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.setTitle("DoeCity");
  win.loadURL('http://localhost:8081/');
  win.on('page-title-updated', function (event) {
    event.preventDefault(); 
  });
  Menu.setApplicationMenu(null);
}

app.on('ready', createWindow);
