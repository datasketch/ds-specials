const nav = document.querySelector('nav')

let lastScrollPosition = 0

window.addEventListener('scroll', (e) => {
  const scrollValue = window.scrollY
  const navHeight = nav.offsetHeight
  if (scrollValue > navHeight) {
    nav.classList.add('nav-affixed')
    if (lastScrollPosition > scrollValue) {
      lastScrollPosition = scrollValue
      nav.classList.remove('nav-minimized')
      nav.classList.add('nav-maximized')
    } else {
      lastScrollPosition = scrollValue
      nav.classList.remove('nav-maximized')
      nav.classList.add('nav-minimized')
    }
    lastScrollPosition = scrollValue
  } else if (scrollValue <= navHeight) {
    nav.classList.remove('nav-affixed')
  }
})