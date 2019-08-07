<template>
  <div class="landing-page">
    <main>
      <div class="columns">
        <div class="col">
          Test
        </div>
        <div class="col">
          {{ copiedMessage }}
        </div>
        <div class="col">
          123
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'LandingPage',
  data () {
    return {
      copiedMessage: ''
    }
  },
  beforeMount () {
    // Listen for the clipboard text from Main
    ipcRenderer.on('item', (event, message) => {
      console.log('item', message)
      this.copiedMessage = message
    })
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  .columns {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

</style>
