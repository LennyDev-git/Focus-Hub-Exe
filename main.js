const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Performance-Flags für flüssige 60FPS Animationen
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('enable-features', 'SharedArrayBuffer');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 950,
    minHeight: 750,
    title: 'Focus Hub Pro',
    // HINZUGEFÜGT: Icon für die Taskleiste
    icon: path.join(__dirname, 'icon.ico'), 
    frame: true, // Standard-Rahmen für bessere Kompatibilität, aber Clean
    backgroundColor: '#0f172a', 
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('index.html');
  win.setMenuBarVisibility(false);

  // Smooth appearance
  win.once('ready-to-show', () => {
    win.show();
    win.focus();
  });
}

// HINZUGEFÜGT: Fix für Windows Taskleisten-Icons (App-ID Gruppierung)
if (process.platform === 'win32') {
  app.setAppUserModelId('com.lenny.focushub');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});




