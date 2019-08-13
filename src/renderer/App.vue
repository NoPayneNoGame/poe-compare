<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'PoeCompare'
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  .normal      { color: $normal }
  .magic       { color: $magic }
  .rare        { color: $rare }
  .unique      { color: $unique }
  .gem         { color: $gem }
  .currency    { color: $currency }
  .quest       { color: $quest }
  .divination  { color: $divination }
  .default     { color: $default }
  .value       { color: $value }
  .augmented   { color: $augmented }
  .fire        { color: $fire }
  .cold        { color: $cold }
  .lightning   { color: $lightning }
  .chaos       { color: $chaos }
  .crafted     { color: $crafted }
  .corrupted   { color: $corrupted }
</style>
