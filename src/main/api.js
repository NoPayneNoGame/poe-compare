import { ipcMain } from 'electron'
import { getItems } from '../shared/poe'

export default function enableIpcApi () {
  ipcMain.on('poe-getCharacter', async (event, accountName, characterName) => {
    console.log('recieved getCharacter')

    const items = await getItems(accountName, characterName)
    console.log('replying getCharacter')
    event.sender.send('poe-getCharacter', items)
  })
}
