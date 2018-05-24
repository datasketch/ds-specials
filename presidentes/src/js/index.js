const gifContainer = document.getElementById('gif-placeholder')
const tag = document.createElement('script')
const firstScriptTag = document.getElementsByTagName('script')[0]
const iframeContainer = document.querySelector('.video-container')
const videoManager = document.querySelector('.video-manager')
const closeVideo = document.querySelector('.close-video')
let iframeContainerTop = iframeContainer.offsetTop
let scrollOffsetTop = Math.floor(iframeContainerTop + (iframeContainer.offsetHeight / 2))
let scrollOffsetBottom = Math.floor(iframeContainerTop - (iframeContainer.offsetHeight / 2))
let player, iframe, state

const app = new Vue({
  el: '#app',
  data: {
    departments: [
      'Nacional',     'Amazonas', 'Antioquia', 'Arauca',
      'Atlántico', 'Bogotá',   'Bolívar',   'Boyacá',
      'Caldas',    'Caquetá',  'Casanare',  'Cauca',
      'Cesar',     'Chocó',    'Córdoba',   'Cundinamarca',
      'Guainía',   'Guaviare', 'Huila',     'La Guajira',
      'Magdalena', 'Meta',     'Nariño',    'Norte de Santander',
      'Putumayo',  'Quindío',  'Risaralda', 'San Andrés y Providencia',
      'Santander', 'Sucre',    'Tolima',    'Valle del Cauca',
      'Vaupés',    'Vichada'
    ],
    reports: undefined,
    department: 'Nacional',
    report: undefined
  },
  computed: {
    lastReport () {
      if (!this.reports) return
      return this.reports.reduce((prev, next) => prev.number > next.number ? prev : next)
    },
    results () {
      if (!this.report) return
      return this.report.dpto.find(d => d.name === this.department).results
    },
    background () {
      if (!this.report) return

      const gifs = this.report.dpto.find(d => d.name === this.department).gifs
      const index = this.getRandomInt(0, gifs.length)

      return { background: `url(data/${gifs[index]}) no-repeat center center` }
    }
  },
  created () {
    this.getReports()
  },
  methods: {
    getReports () {
      fetch('../../data/data.json')
        .then(res => res.json())
        .then(json => {
          this.reports = json.sort((a, b) => b.number - a.number)
          this.report = this.reports[0]
        })
    },
    getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min)) + min
    }
  }
})

tag.src = "https://www.youtube.com/iframe_api"
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-content', {
    height: '0',
    width: '0',
    videoId: 'z7yqtW4Isec',
    playerVars: {
      showinfo: 0,
      rel: 0,
    },
    events: { onReady, onStateChange }
  })
}

function onReady (event) {
  iframe = player.getIframe()
  addListeners()
}

function onStateChange (event) {
  state = event.data

  if (state === 0 && iframe.classList.contains('is-playing')) {
    iframe.classList.remove('stick')
  }

  if (state === 1) {
    iframe.classList.add('is-playing')
  }

  if (state === 2 && !(iframe.classList.contains('stick'))) {
    iframe.classList.remove('is-playing')
  }
}

function addListeners () {
  window.addEventListener('resize', () => {
    iframeContainerTop = iframeContainer.offsetTop
    scrollOffsetTop = Math.floor(iframeContainerTop + (iframeContainer.offsetHeight / 2))
  })

  window.addEventListener('scroll', () => {
    const { pageYOffset } = window
    iframe.classList.toggle('stick', ((pageYOffset > scrollOffsetTop || pageYOffset < scrollOffsetBottom) && iframe.classList.contains('is-playing')))
    videoManager.classList.toggle('visible', iframe.classList.contains('stick'))
  })

  closeVideo.addEventListener('click', event => {
    event.preventDefault()
    videoManager.classList.remove('visible')
    iframe.classList.remove('stick')
    iframe.classList.remove('is-playing')
    player.pauseVideo()
  })
}
