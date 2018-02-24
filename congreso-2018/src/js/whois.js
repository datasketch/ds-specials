window.network = undefined

const Sidebar = {
  props: ['nodes', 'index'],
  template: `
    <div id="sidebar">
     <ul class="sidebar-list font-family--exo">
      <li v-for="(n,i) in nodes" :key="i" :class="['Column', 'font-weight-light',{ 'active': index === i }]" @click="register(n,i)">{{n.label}}</li>
     </ul>
    </div>
  `,
  methods: {
    register (n, i) {
      this.$emit('item', n, i)
    } 
  }
}

const Network = {
  props: ['data', 'index'],
  template: `
    <div id="network-container" class="Column">
      <div class="network-info Column VCenter">
        <div class="container-section">
         <p style="margin: 0" class="font-family--exo">Selecciona un político de la lista para filtrar la red</p>
         <a href="" class="font-family--exo text-emerald reset" style="font-size: small" @click.prevent="reset" v-if="index !== undefined">Reiniciar</a>
        </div>
      </div>
      <div id="network">
      <div>
    </div>
  `,
  data () {
    return {
      options: {
        nodes: {
          font: {
            size: 12
          },
          scaling: {
            min: 1,
            max: 5
          },
          value: 3
        },
        edges: {
          arrows: {
            to: { enabled: true, scaleFactor: 1, type: 'arrow' },
          }
        },
        physics:{
          stabilization: true
        }
      }
    }
  },
  mounted () {
    const container = document.getElementById('network')
    const nodes = new vis.DataSet(this.data.nodes)
    const edges = new vis.DataSet(this.data.edges)
    const data = { nodes, edges }
    network = new vis.Network(container, data, this.options)
  },
  watch: {
    data: function (val) {
      const nodes = new vis.DataSet(val.nodes)
      const edges = new vis.DataSet(val.edges)
      network.setData({ nodes, edges })
    }
  },
  methods: {
    reset: function () {
      this.$emit('reset')
    }
  }
}

const whois = new Vue({
  el: '#whois',
  data: {
    nodes: [
      { id: 'flory-elcome', label: 'Flory Elcome' },
      { id: 'sybyl-noddings', label: 'Sybyl Noddings' },
      { id: 'tony-townby', label: 'Tony Townby' },
      { id: 'sherrie-jorden', label: 'Sherrie Jorden' },
      { id: 'sindee-stabler', label: 'Sindee Stabler' },
      { id: 'viki-broadway', label: 'Viki Broadway' },
      { id: 'cyril-burgisi', label: 'Cyril Burgisi' },
      { id: 'francklin-duthy', label: 'Francklin Duthy' },
      { id: 'elly-rickersy', label: 'Elly Rickersy' },
      { id: 'stu-hacquel', label: 'Stu Hacquel' },
    ],
    edges: [
      { from: 'flory-elcome', to: 'tony-townby', label: 'REL_TYPE' },
      { from: 'flory-elcome', to: 'cyril-burgisi', label: 'REL_TYPE' },
      { from: 'sybyl-noddings', to: 'elly-rickersy', label: 'REL_TYPE' },
      { from: 'tony-townby', to: 'cyril-burgisi', label: 'REL_TYPE' },
      { from: 'sherrie-jorden', to: 'stu-hacquel', label: 'REL_TYPE' },
      { from: 'sherrie-jorden', to: 'viki-broadway', label: 'REL_TYPE' },
      { from: 'sindee-stabler', to: 'francklin-duthy', label: 'REL_TYPE' },
      { from: 'sindee-stabler', to: 'flory-elcome', label: 'REL_TYPE' },
      { from: 'francklin-duthy', to: 'elly-rickersy', label: 'REL_TYPE' },
      { from: 'stu-hacquel', to: 'sybyl-noddings', label: 'REL_TYPE' }
    ],
    filtered_nodes: [],
    filtered_edges: [],
    index: undefined
  },
  computed: {
    network: function () {
      return { nodes: this.filtered_nodes, edges: this.filtered_edges }
    }
  },
  methods: {
    filter: function (p, i) {
      const id = p.id
      this.index = i
      this.filtered_edges = this.edges.slice().filter(e => e.from === id || e.to === id)
      const lookup = this.filtered_edges.reduce((arr, e) => {
        if (!arr.includes(e.from)) {
          arr.push(e.from)
        }
        if (!arr.includes(e.to)) {
          arr.push(e.to)
        }
        return arr
      }, [])
      this.filtered_nodes = this.nodes.slice().filter(n => lookup.includes(n.id))
    },
    reset: function () {
      this.filtered_nodes = this.nodes.slice()
      this.filtered_edges = this.edges.slice()
      this.index = undefined
    }
  },
  created () {
    this.filtered_nodes = this.nodes.slice()
    this.filtered_edges = this.edges.slice()
  },
  components: {
    'Sidebar': Sidebar,
    'Network': Network
  }
})