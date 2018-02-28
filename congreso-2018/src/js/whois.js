window.network = undefined

function spider (main, checkpoint) {
  const temp = main.slice().reduce((array, data) => {
    checkpoint.forEach(point => {
      if (data.from === point || data.to === point) {
        array.push(data.from, data.to)
      }
    })
    return array
  }, [])

  return [...new Set(temp)]
}

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
          shape: 'dot',
          color: '#f26101',
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
            to: { enabled: true, scaleFactor: 0.5, type: 'arrow' },
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
    nodesList: [],
    nodes: [],
    edges: [],
    filtered_nodes: [],
    filtered_edges: [],
    index: undefined,
    loaded: false
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
      this.filtered_edges = []
      
      let firstDegree = this.edges.slice()
        .filter(edge => edge.from === id || edge.to === id)
        .reduce((array, edge) => {
          this.filtered_edges.push(edge)
          array.push(edge.from, edge.to)
          return array
        }, [])

      firstDegree = [...new Set(firstDegree)]
      
      let secondDegree = this.edges.slice()
        .reduce((array, edge) => {
          firstDegree.forEach(degree => {
            if (edge.from === degree || edge.to === degree) {
              this.filtered_edges.push(edge)
              array.push(edge.from, edge.to)
            }
          })
          return array
        }, [])

      secondDegree = [...new Set(secondDegree)]
      
      this.filtered_edges = [...new Set(this.filtered_edges)]
      this.filtered_nodes = this.nodes.slice().filter(n => secondDegree.includes(n.id))
    },
    reset: function () {
      this.filtered_nodes = this.nodes.slice()
      this.filtered_edges = this.edges.slice()
      this.index = undefined
    }
  },
  created () {
    const self = this
    Tabletop.init({
      key: 'https://docs.google.com/spreadsheets/d/1y-GhkwBvNjhzAjLj3Syg1DZstGHhHUU7ssm82a4i9GQ/edit?usp=sharing',
      callback: function (data, tabletop) {
        const nodesList = tabletop.sheets('nodos-lista').all()

        const nodes = tabletop.sheets('nodos-viz').all()
        const edges = tabletop.sheets('links').all().map(({source, rel_type, target}) => ({ from: source, to: target, label: rel_type }))

        self.nodesList = nodesList
        self.nodes = nodes
        self.edges = edges
        self.filtered_nodes = self.nodes.slice()
        self.filtered_edges = self.edges.slice()
        self.loaded = true
      }
    })
  },
  components: {
    'Sidebar': Sidebar,
    'Network': Network
  }
})