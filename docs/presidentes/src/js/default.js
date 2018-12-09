const nav = document.querySelector('nav')
const burger = document.querySelector('.burger-box')
const menu = document.querySelector('.menu')

WebFont.load({
  google: {
    families: ['Exo 2', 'Exo 2:300', 'Press Start 2P']
  }
})

let lastScrollPosition = 0

burger.addEventListener('click', onBurgerClick)
window.addEventListener('scroll', onWindowScroll)

function onBurgerClick () {
  burger.classList.toggle('burger-open')
  menu.classList.toggle('opened')
  document.body.classList.toggle('no-scroll')
  nav.classList.toggle('activated')
}

// Should refactor this listener
function onWindowScroll (e) {
  const scrollValue = window.scrollY
  const navHeight = nav.offsetHeight
  if (scrollValue > navHeight) {
    if (lastScrollPosition >= scrollValue) {
      resetNav()
    } else {
      nav.classList.remove('nav-affixed')
      nav.classList.remove('nav-minimized')
      nav.classList.add('nav-maximized')
    }
    lastScrollPosition = scrollValue
  } else if (scrollValue <= navHeight) {
    resetNav()
  }
}

function resetNav () {
  nav.classList.add('nav-affixed')
  nav.classList.add('nav-minimized')
  nav.classList.remove('nav-maximized')
}
