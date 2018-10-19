<template>
  <div
    id="app"
    :class="{ flex : !loading }"
  >
    <Loader
      v-if="loading"
      :size="40"
      color="#66bb6a"/>
    <div :class="['aside', { 'no-visible': !organizations.length }]">
      <div :class="['aside__header line v-centered justify-between', { shrink: selected }]">
        <h3
          class="aside__title"
          @click="listOrganizations"
        >
          {{ selected ? '&larr; ' + city : city }}
        </h3>
        <div
          class="reset"
          @click="reset" />
      </div>
      <keep-alive>
        <component
          :is="layout"
          v-bind="dynamicProps"/>
      </keep-alive>
    </div>
    <div id="map" />
  </div>
</template>


<script>
import 'leaflet/dist/leaflet.css'
import Loader from '~/components/Loader'
import Organizations from '~/components/Organizations'
import Detail from '~/components/Detail'
import { mapState } from 'vuex'
let L

if (process.browser) {
  L = require('leaflet')
}

export default {
  name: 'Map',
  components: { Loader, Organizations, Detail },
  props: {
    tile: {
      type: String,
      required: true
    },
    center: {
      type: Array,
      required: true
    },
    minZoom: {
      type: Number,
      default: 3
    },
    maxZoom: {
      type: Number,
      default: 7
    }
  },
  data () {
    return {
      map: undefined,
      group: undefined,
      loading: true,
      city: undefined,
      country: undefined,
      selected: undefined,
      organizations: [],
      styles: {
        global: {
          color: '#66bb6a',
          fillColor: '#66bb6a',
          fillOpacity: 0.5,
          opacity: 0.5,
          radius: 65000,
          weight: 1
        },
        active: {
          fillOpacity: 0.9,
          opacity: 0.9
        }
      }
    }
  },
  computed: {
    ...mapState(['values', 'points']),
    layout () {
      if (!this.selected) {
        return Organizations
      }
      return Detail
    },
    dynamicProps () {
      if (!this.selected) {
        return {
          values: this.organizations,
          onclick: this.selectOrganization
        }
      }
      return { organization: this.selected }
    }
  },
  mounted () {
    // Initialize layer group.
    this.initializeMap()

    // Create feature group
    this.group = L.featureGroup()

    // Add points to layer group and bind click event for each one.
    const points = this.points.map(([city, country, lat, lng]) => {
      if (lat) {
        const point = L.circle([lat, lng], this.styles.global).bindTooltip(`${city}, ${country}`, { direction: 'top' })
        .on('click', this.handleClickOnLayer)
        this.group.addLayer(point)
      }
    })

    // Add layer group to map.
    this.group.addTo(this.map)

    // Add notice control to map.
    this.addNoticeControl()
  },
  methods: {
    initializeMap () {
      this.map = L.map('map', {
        center: this.center,
        zoom: 3,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom
      })

      // Disable loader
      this.loading = false

      // Add tile layer to map.
      L.tileLayer(this.tile).addTo(this.map)
    },
    handleClickOnLayer ({ target }) {
      const { lat, lng } = target.getLatLng()
      this.group.setStyle(this.styles.global)
      target.setStyle(this.styles.active)
      this.organizations = this.values.filter(v => (+v.lat === lat) && (+v.lng === lng))
      this.city = this.organizations[0].city
      this.country = this.organizations[0].country
      this.map.fitBounds(target.getBounds())
    },
    addNoticeControl () {
      const control = L.control()
      control.onAdd = map => {
        const notice = L.DomUtil.create('div', 'notice')
        notice.innerHTML = '<p>Haz clic en alguno de los puntos</p>'
        return notice
      }
      control.addTo(this.map)
    },
    selectOrganization (organization) {
      this.selected = organization
    },
    listOrganizations () {
      if (!this.selected) {
        return
      }
      this.selected = undefined
    },
    reset () {
      this.organizations = []
      this.city = undefined
      this.selected = undefined
      this.group.setStyle(this.styles.global)
      this.map.setZoom(this.minZoom)
    }
  }
}
</script>

<style scoped>
.loader {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
}

#app {
  height: 100vh;
}

#app.flex {
  display: flex;
}

#map {
  height: 100%;
  width: 100%;
}

.aside {
  max-height: 100%;
  overflow-y: auto;
  transition: 0.4s ease-in-out;
  width: 400px;
}

.aside.no-visible {
  padding: 0;
  width: 0;
}

.aside__header {
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  font-family: 'PT Sans', sans-serif;
  padding: 10px;
  position: sticky;
  top: 0;
}

.aside__header.shrink {
  box-shadow: none;
  padding: 5px 10px;
  position: static;
  border-bottom: 1px solid #eeeeee;
}

.aside__header.shrink .aside__title {
  cursor: pointer;
  font-size: small;
}

.aside__header.shrink .aside__reset {
  height: 10px;
  width: 10px;
}

.aside__title {
  font-size: 24px;
  transition: 0.3s ease-out;
}

.reset {
  background-image: url(~assets/images/close.png);
  background-position: center;
  background-size: cover;
  cursor: pointer;
  height: 15px;
  width: 15px;
}

.aside::-webkit-scrollbar {
  width: 7px;
}

.aside::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.aside::-webkit-scrollbar-thumb {
  background: #888;
}

.aside::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

<style>
.notice {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 15px rgba(0, 0, 0, .2);
  font-family: 'PT Sans', sans-serif;
  padding: 6px 8px;
}
</style>

