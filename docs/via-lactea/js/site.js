const header = document.querySelector('header')
window.addEventListener('scroll', function () {
  const offset = window.pageYOffset
  header.classList.toggle('affixed', offset > 100)
})
