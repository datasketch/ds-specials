import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: {
      values: [],
      points: []
    },
    mutations: {
      setValues (state, values) {
        state.values = values
      },
      setPoints (state, points) {
        state.points = points
      }
    },
    actions: {
      async getSpreadsheetData ({ commit }) {
        const { data } = await this.$axios.$get('https://script.googleusercontent.com/macros/echo?user_content_key=3OIATuhIOi_2RftB1L2crgi4JOhU0ODrAnMDL58rs-kd5hDQDuAfcoJPar7_8ZP6U49bCaWBhNkuwiiWurJDAYilP9AXyGRSm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnASyiNeYGOHNuciMgVQXrNzTuUsYVsWfPF8YJXDSecLxsHfdb0rqHAQYWifPTNu7iNpytj_A4aoE&lib=MVw3vcBzpoRce2kAb8hp7l4zQbgHhzg3Z')

        // Remove data without latitude info.
        const values = data.filter(d => d.lat)

        // Get coordinates as numbers
        let points = values.map(({ city, country, lat, lng }) => [city, country, +lat, +lng])

        // Make points array unique.
        points = new Set(points.map(JSON.stringify))
        points = Array.from(points).map(JSON.parse)

        // Commit values.
        commit('setPoints', points)
        commit('setValues', values)
      }
    }
  })
}

export default store
