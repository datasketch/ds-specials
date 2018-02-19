Vue.component('people-list', {
  props: ['people'],
  template: `
    <ul class="people-container">
      <li class="person" v-for="(person, index) in people" :key="person" @click="detail(person)">
        <img :src="person.Foto" alt="" class="person-avatar">
        <p class="font-family--exo font-size--small">{{ person.Nombre | titleCase }}</p>
        <small class="font-family--exo font-weight-light">{{ person.Partido | titleCase }}</small>
      </li>
    </ul>
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
          <img :src="person.Foto" alt="" class="card-avatar">
          <div class="card-header font-family--exo">
            <p>{{person.Nombre | titleCase}}</p>
            <small class="font-weight-light">{{person.Partido}}</small>
          </div>
        </div>
        <div class="card-body font-family--exo font-weight-light">
          <p class="card-profile">{{person.PERFIL}}</p>
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
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
})

const vm = new Vue({
  el: '#app',
  data: {
    loaded: false,
    master: true,
    people: [],
    person: {},
    search: '',
  },
  computed: {
    peopleFiltered: function () {
      return this.people.filter(person => {
        return person.Nombre.toLowerCase().includes(this.search.toLowerCase())
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
    }
  },
  created () {
    const self = this
    Tabletop.init({
      key: 'https://docs.google.com/spreadsheets/d/1Y0ZDxSsINRqfF6jGGEJo6dRRUe-6ynofpXbiHKTkocY/edit?usp=sharing',
      callback: function (data) {
        self.people = data
        self.loaded = true
      },
      simpleSheet: true
    })
  }
})