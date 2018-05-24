const tag = document.createElement('script')
const firstScriptTag = document.getElementsByTagName('script')[0]
const iframeContainer = document.querySelector('.video-container')
const videoManager = document.querySelector('.video-manager')
const closeVideo = document.querySelector('.close-video')
let iframeContainerTop = iframeContainer.offsetTop
let scrollOffsetTop = Math.floor(iframeContainerTop + (iframeContainer.offsetHeight / 2))
let scrollOffsetBottom = Math.floor(iframeContainerTop - (iframeContainer.offsetHeight / 2))
let player, iframe, state

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
