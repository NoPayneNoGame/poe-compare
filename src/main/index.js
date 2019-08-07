'use strict'

import { app, BrowserWindow, globalShortcut, clipboard } from 'electron'
import robot from 'robotjs'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

let mainWindow
const winURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080'
    : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Register a global hotkey
  const hotkey = 'F7'
  const hotkeyReg = globalShortcut.register(hotkey, () => {
    console.log(`${hotkey} Pressed!`)

    // Simulate a ctrl+c
    robot.keyTap('c', 'control')

    const copyText = clipboard.readText()
    console.log('Copied: ', copyText)

    // Send the clipboard contents to the Renderer
    mainWindow.webContents.send('item', copyText)
  })

  if (!hotkeyReg) {
    console.log('Hotkey registration failed')
  }

  console.log(`${hotkey} registered:`, globalShortcut.isRegistered(hotkey))
}

app.on('ready', createWindow)

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
