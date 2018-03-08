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
          <img :src="person.photo" alt="" class="person-avatar">
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
          <img :src="person.photo" alt="" class="card-avatar">
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
      camara: '',
      senado: '',
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
      let people = this.people
      if (this.filters.matrimonio !== '') {
        people = people.filter(p => p.matrimonio === this.filters.matrimonio)
      }
      if (this.filters.adopcion !== '') {
        people = people.filter(p => p.adopcion === this.filters.adopcion)
      }
      if (this.filters.aborto !== '') {
        people = people.filter(p => p.aborto === this.filters.aborto)
      }
      if (this.filters.marihuana !== '') {
        people = people.filter(p => p.marihuana === this.filters.marihuana)
      }
      if (this.filters.eutanasia !== '') {
        people = people.filter(p => p.eutanasia === this.filters.eutanasia)
      }
      if (this.filters.paz !== '') {
        people = people.filter(p => p.paz === this.filters.paz)
      }
      if (this.filters.policia) {
        people = people.filter(p => p.policia)
      }
      if (this.filters.contraloria) {
        people = people.filter(p => p.contraloria)
      }
      if (this.filters.procuraduria) {
        people = people.filter(p => p.procuraduria)
      }
      if (this.filters.camara) {
        people = people.filter(p => p.camara)
      }
      if (this.filters.senado) {
        people = people.filter(p => p.senado)
      }
      if (this.filters.parties.length) {
        people = people.filter(p => this.filters.parties.includes(p.partido))
      }
      return people.filter(person => {
        return person.nombre.toLowerCase().includes(this.search.toLowerCase())
      })
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
        camara: '',
        senado: '',
        parties: []
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
          return {
            nombre: row.nombre,
            perfil: row.perfil,
            photo: row.imagen,
            partido: row.partido,
            camara: row.camara.trim().toLowerCase(),
            senado: row.senado.trim().toLowerCase(),
            matrimonio: row.matrimonio_homosexual.trim().toLowerCase() || 'vacío',
            adopcion: row.adopcion_por_parte_de_homosexuales.trim().toLowerCase() || 'vacío',
            aborto: row.legalizacion_aborto.trim().toLowerCase() || 'vacío',
            marihuana: row.legalizacion_marihuana.trim().toLowerCase() || 'vacío',
            eutanasia: row.legalizacion_eutanasia.trim().toLowerCase() || 'vacío',
            paz: row.acuerdo_de_paz.trim().toLowerCase() || 'vacío',
            camara: row.camara.toLowerCase().trim().toLowerCase() === 'x',
            senado: row.senado.toLowerCase().trim().toLowerCase() === 'x',
            policia: row.antecedentes_policia.trim().toLowerCase() === 'si',
            contraloria: row.contraloria.trim().toLowerCase() === 'si',
            procuraduria: row.procuraduria.trim().toLowerCase() === 'si',
            observation: row.observaciones.trim()
          }
        })
        data_parties.map(d => {
          if (!parties.includes(d)) {
            parties.push(d)
          }
        })
        self.parties = parties
        self.loaded = true
      },
      simpleSheet: true
    })
  }
})