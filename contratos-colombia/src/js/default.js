const nav = document.querySelector('nav')
const burger = document.querySelector('.burger-box')
const menu = document.querySelector('.menu')

let lastScrollPosition = 0

burger.addEventListener('click', () => {
  burger.classList.toggle('burger-open')
  menu.classList.toggle('opened')
  document.body.classList.toggle('no-scroll')
  nav.classList.toggle('activated')
})

window.addEventListener('scroll', (e) => {
  const scrollValue = window.scrollY
  const navHeight = nav.offsetHeight
  if (scrollValue > navHeight) {
    nav.classList.add('nav-affixed')
    if (lastScrollPosition >= scrollValue) {
      lastScrollPosition = scrollValue
      nav.classList.remove('nav-minimized')
      nav.classList.add('nav-maximized')
    } else {
      lastScrollPosition = scrollValue
      if (!menu.classList.contains('opened')) {
        nav.classList.remove('nav-maximized')
        nav.classList.add('nav-minimized')
      }
    }
    lastScrollPosition = scrollValue
  } else if (scrollValue <= navHeight) {
    nav.classList.remove('nav-affixed')
  }
})