<template>
  <Map
    :center="[4.6097100, -74.0817500]"
    tile="https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
</template>

<script>
import Map from '~/components/Map'

export default {
  components: {
    Map
  },
  async fetch ({ store }) {
    await store.dispatch('getSpreadsheetData')
  }
}
</script>
