const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const body = document.body;
hamburger.addEventListener('click', e => {
	hamburger.classList.toggle('is-active');
	menu.classList.toggle('overlayed');
	body.classList.toggle('no-scroll');
});