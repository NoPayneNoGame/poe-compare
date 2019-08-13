<template>
  <div class="landing-page">
    <main class="page-content">
      <div class="error-message">
        {{ errorMessage }}
      </div>

      <form
        class="inputs"
        @submit.prevent="getCharacter"
      >
        <label>
          Account Name:
          <input
            v-model="accountName"
            type="text"
          >
        </label>
        <label>
          Character Name:
          <input
            v-model="characterName"
            type="text"
          >
        </label>
        <input
          type="submit"
          value="Find"
        >
      </form>

      <div class="character-wrapper">
        {{ accountName }} {{ characterName }}
      </div>
      <character :items="items" />
    </main>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import Character from '../components/Character'

export default {
  name: 'LandingPage',
  components: { Character },
  data () {
    return {
      copiedMessage: '',
      accountName: 'AReallyCoolWig',
      characterName: 'SlowRoastedNutBar',
      errorMessage: '',
      items: []
    }
  },
  beforeMount () {
    // Listen for the clipboard text from Main
    ipcRenderer.on('item', (event, message) => {
      console.log('item', message)
      this.copiedMessage = message
    })
  },
  methods: {
    async getCharacter () {
      ipcRenderer.on('poe-getCharacter', (event, { error, character, items }) => {
        console.log('Recieved getCharacter', Object.keys(items[0]))
        if (error) {
          this.items = []
          this.errorMessage = error.data
        } else {
          this.items = items
          this.errorMessage = ''
        }
      })

      console.log('Sending getCharacter')
      ipcRenderer.send('poe-getCharacter', this.accountName, this.characterName)
    }
  }
}
</script>

<style lang="scss">
  .landing-page .page-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .inputs {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .error-message {
      color: red;
      font-weight: bold;
    }
  }

</style>
