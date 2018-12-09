const spacer = document.querySelector('.spacer')

function setSpacerHeight () {
  const navHeight = document.querySelector('.nav').offsetHeight
  spacer.style.height = `${navHeight}px`
}

setSpacerHeight()

window.addEventListener('resize', function () {
  setSpacerHeight()
})
