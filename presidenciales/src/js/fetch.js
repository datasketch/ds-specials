new Vue({
  el: '#info',
  data: {
    loading: true,
    candidates: []
  },
  created () {
    const self = this
    Tabletop.init({
      key: 'https://docs.google.com/spreadsheets/d/1_7jMuOyKhIBKa0BdnxO1BJE4jYAD0K_SqgWZIuxyLbU/edit?usp=sharing',
      callback: (data, tabletop) => {
        this.manage(tabletop.sheets('PETRO').all())
        this.manage(tabletop.sheets('DUQUE').all())
        self.loading = false
      }
    })
  },
  methods: {
    manage (table) {
      const team = table.map(row => ({ name: row['NOMBRE_APP'], description: row['DESCRIPCION'], opened: false }))
      const candidate = team.shift()
      candidate.team = team
      this.candidates.push(candidate)
    },
    togglePanel (event, candidate, player) {
      const { target } = event
      target.classList.toggle('active')
      target.nextElementSibling.classList.toggle('active')
      const team = this.candidates.find(c => c.name === candidate.name).team
      const selected = team.find(p => p.name === player.name)
      selected.opened = !selected.opened
    }
  }
})
