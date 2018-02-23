window.sr = ScrollReveal()
sr.reveal('.story-item', {
  duration: 800,
  delay: 500,
  scale: 0.8,
})

Vue.component('people-list', {
  props: ['people'],
  template: `
    <div>
      <p v-if="!people.length" class="font-family--exo">No hay resultados</p>
      <ul class="people-container" v-if="people.length">
        <li class="person" v-for="(person, index) in people" :key="person" @click="detail(person)">
          <img :src="person.imagen" alt="" class="person-avatar">
          <p class="font-family--exo font-size--small">{{ person.nombre | titleCase }}</p>
          <small class="font-family--exo font-weight-light">{{ person.partido }}</small>
        </li>
      </ul>
    </div>
  `,
  data: function () {
    return {
    }
  },
  methods: {
    detail: function (person) {
      this.$emit('detail', person)
    }
  }
})

Vue.component('person-detail', {
  props: ['person'],
  template: `
    <div class="person-detail Column">
      <a @click.prevent="master" href="" class="font-family--exo">Volver</a>
      <div class="card">
        <div class="card-info Row">
          <img :src="person.imagen" alt="" class="card-avatar">
          <div class="card-header font-family--exo">
            <p>{{person.nombre | titleCase}}</p>
            <small class="font-weight-light">{{person.partido}}</small>
          </div>
        </div>
        <div class="card-body font-family--exo font-weight-light">
          <p class="card-profile">{{person.perfil}}</p>
        </div>
      </div>
    </div>
  `,
  data: function () {
    return {
    }
  },
  methods: {
    master: function () {
      this.$emit('master')
    }
  }
})

Vue.filter('titleCase', function (str) {
  return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
})

const vm = new Vue({
  el: '#app',
  data: {
    loaded: false,
    master: true,
    began: false,
    people: [],
    person: {},
    search: '',
    count: 1,
    parties: [],
    filters: {
      matrimonio: '',
      adopcion: '',
      aborto: '',
      marihuana: '',
      eutanasia: '',
      paz: '',
      procuraduria: '',
      contraloria: '',
      policia: '',
      camara: true,
      senado: true,
      parties: []
    }
  },
  computed: {
    peopleFiltered: function () {
      return this.people.filter(person => {
        return person.nombre.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    filtered: function () {

      let group = []

			const matrimonio = this.filters.matrimonio ? this.filters.matrimonio === 'true' : ''
			const adopcion = this.filters.adopcion ? this.filters.adopcion === 'true' : ''
      const aborto = this.filters.aborto ? this.filters.aborto === 'true' : ''
      const marihuana = this.filters.marihuana ? this.filters.marihuana === 'true' : ''
      const eutanasia = this.filters.eutanasia ? this.filters.eutanasia === 'true' : ''
      const paz = this.filters.paz ? this.filters.paz === 'true' : ''

      const procuraduria = this.filters.procuraduria ? true : ''
      const contraloria = this.filters.contraloria ? true : ''
      const policia = this.filters.policia ? true : ''

      const camara = this.filters.camara
      const senado = this.filters.senado

      const partidos = this.filters.parties

      if (camara && senado) {
        group = this.people
      } else if (camara) {
        group = this.people.filter(p => p.camara === camara)
      } else if (senado) {
        group = this.people.filter(p => p.senado === senado)
      }

      return (
        group
          .filter(p => {
            return partidos.find(partido => partido == p.partido)
          })
          .filter(p => {
            const result = (
              (p.adopcion === adopcion || adopcion === '') &&
              (p.matrimonio === matrimonio || matrimonio === '') &&
              (p.aborto === aborto || aborto === '') &&
              (p.eutanasia === eutanasia || eutanasia === '') &&
              (p.marihuana === marihuana || marihuana === '') &&
              (p.paz === paz || paz === '') &&
              (p.procuraduria === procuraduria || procuraduria === '') &&
              (p.contraloria === contraloria || contraloria === '') &&
              (p.policia === policia || policia === '')
            )
            return result
          })
          .filter(person => person.nombre.toLowerCase().includes(this.search.toLowerCase()))
      )
    }
  },
  methods: {
    showDetail: function (person) {
      this.master = !this.master
      this.person = person
    },
    showAll: function () {
      this.master = !this.master
    },
    showFilterForm: function () {
      this.began = true
    },
    advance: function () {
      this.count += 1
    },
    backup: function () {
      this.count -= 1
    },
    clearAll: function () {
      const parties = this.parties
      this.filters = {
        matrimonio: '',
        adopcion: '',
        aborto: '',
        marihuana: '',
        eutanasia: '',
        paz: '',
        procuraduria: '',
        contraloria: '',
        policia: '',
        camara: true,
        senado: true,
        parties: parties
      }
    },
    reset: function () {
      this.clearAll()
      this.count = 1
    }
  },
  created () {
    const self = this
    Tabletop.init({
      key: 'https://docs.google.com/spreadsheets/d/1Y0ZDxSsINRqfF6jGGEJo6dRRUe-6ynofpXbiHKTkocY/edit?usp=sharing',
      callback: function (data) {
        const data_parties = data.map(({ partido }) => partido)
        const parties = []
        self.people = data.map(row => {
          row.matrimonio = row.matrimonio_homosexual.trim().match('A favor') ? true : false
          row.adopcion = row.adopcion_por_parte_de_homosexuales.trim().match('A favor') ? true : false
          row.aborto = row.legalizacion_aborto.trim().match('A favor') ? true : false
          row.marihuana = row.legalizacion_marihuana.trim().match('A favor') ? true : false
          row.eutanasia = row.legalizacion_eutanasia.trim().match('A favor') ? true : false
          row.paz = row.acuerdo_de_paz.trim().match('A favor') ? true : false
          row.camara = row.camara.toLowerCase().trim().match('x') ? true : false
          row.senado = row.senado.toLowerCase().trim().match('x') ? true : false
          row.policia = row.antecedentes_policia.trim().toLowerCase().match('si') ? true : false
          row.contraloria = row.contraloria.trim().toLowerCase().match('si') ? true : false
          row.procuraduria = row.procuraduria.trim().toLowerCase().match('si') ? true : false
          return row
        })
        data_parties.map(d => {
          if (!parties.includes(d)) {
            parties.push(d)
          }
        })
        self.parties = parties
        self.filters.parties = self.parties
        self.loaded = true
      },
      simpleSheet: true
    })
  }
})