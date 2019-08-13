<template>
  <div class="item">
    <img
      :src="item.icon"
      :alt="item.name"
      class="icon"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
      @mousemove="onMouseMove"
    >
    <div
      v-if="showTooltip"
      class="tooltip"
      :style="{ top: `${mouse.y}px`, left: `${mouse.x}px` }"
    >
      <div
        class="title"
        :class="{ [rarity]: true }"
      >
        <div>{{ item.name }}</div>
        <div>{{ item.typeLine }}</div>
      </div>

      <div class="properties default">
        <div
          v-for="prop in item.properties"
          :key="prop.type"
        >
          <div v-if="prop.displayMode === 0">
            <span>{{ prop.name }}</span>
            <span v-if="prop.values.length">
              <span>:</span>
              <span :class="propClass(prop.values[0])">
                {{ prop.values[0][0] }}
              </span>
            </span>
          </div>

          <div v-else-if="prop.displayMode === 3">
            <span
              v-for="(v, i) in displayMode3(prop)"
              :key="i"
              :class="{ [v.class]: true }"
            >
              {{ v.value }}
            </span>
          </div>
        </div>
      </div>
      <!-- /properties -->

      <div class="seperator" />
      <div v-if="item.implicitMods && item.implicitMods.length">
        <div
          v-for="mod in item.implicitMods"
          :key="mod"
          class="augmented"
        >
          {{ mod }}
        </div>
        <div class="seperator" />
      </div>
      <div v-if="(item.explicitMods && item.explicitMods.length) || (item.craftedMods && item.craftedMods.length)">
        <div
          v-for="mod in item.explicitMods"
          :key="mod"
          class="augmented"
        >
          {{ mod }}
        </div>
        <div
          v-for="mod in item.crafted"
          :key="mod"
          class="crafted"
        >
          {{ mod }}
        </div>
      </div>
    </div>

    <!-- <div class="sockets">
      :)
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showTooltip: false,
      mouse: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    rarity () {
      switch (this.item.frameType) {
      case 1:
        return 'magic'
      case 2:
        return 'rare'
      case 3:
        return 'unique'
      case 4:
        return 'gem'
      case 5:
        return 'currency'
      case 6:
        return 'divination'
      default:
        return 'normal'
      }
    }
  },
  methods: {
    onMouseMove (event) {
      this.mouse.x = event.offsetX + 20
      this.mouse.y = event.offsetY + 10
    },
    propClass (prop) {
      switch (prop[1]) {
      case 0:
        return 'value'
      case 1:
        return 'augmented'
      default:
        return 'rare'
      }
    },
    displayMode3 (prop) {
      return prop.name.split(' ').map(v => {
        switch (v) {
        case '%0':
          return { value: prop.values[0][0], class: this.propClass(prop.values[0]) }
        case '%1':
          return { value: prop.values[1][0], class: this.propClass(prop.values[1]) }
        default:
          return { value: v, class: '' }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.item {
  position: relative;
  .icon {
    border: 1px solid black;
  }

  .tooltip {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    z-index: 999;

    position: absolute;

    width: 400px;
    height: auto;

    background: rgba(0, 0, 0, 0.8);
    pointer-events: none;

    text-align: center;
    padding: 4px 2px 8px;

    .title {
      font-weight: bold;
      font-size: 1.2em;
      padding: 4px 8px;
      margin-bottom: 8px;
      border: 2px solid;
      &.normal { border-color: $normal; }
      &.magic  { border-color: $magic;  }
      &.rare   { border-color: $rare;   }
      &.unique { border-color: $unique; }
    }

    .seperator {
      height: 2px;
      width: 40%;
      margin: 4px auto;
      background-color:  rgba(255, 255, 119, 0.4);
      border-radius: 50%;
    }
  }

  // .sockets {
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   left: 0;
  //   bottom: 0;
  //   background: rgba(255, 0, 255, 0.3);
  // }
}
</style>
