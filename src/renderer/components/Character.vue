<template>
  <div class="character-viewer">
    <div
      v-for="item in items"
      :key="item.id"
      class="item"
    >
      <item :item="item" />
    </div>
  </div>
</template>

<script>
import Item from './Item'

export default {
  name: 'CharacterViewer',
  components: { Item },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
</style>
