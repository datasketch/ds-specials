const burger = document.querySelector('.burger-box')
const menu = document.querySelector('.menu')
const nav = document.querySelector('nav')
const body = document.querySelector('body')

burger.addEventListener('click', () => {
  burger.classList.toggle('burger-open')
  menu.classList.toggle('opened')
  nav.classList.toggle('opened')
  body.classList.toggle('no-scroll')
})