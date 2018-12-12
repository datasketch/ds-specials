const header = document.querySelector('header')

window.addEventListener('scroll', function () {
  const y = window.scrollY
  if (y >= 100) {
    header.classList.add('affixed')
  } else {
    header.classList.remove('affixed')
  }
})