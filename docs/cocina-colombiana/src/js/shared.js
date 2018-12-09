const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const body = document.body;
const toggleClass = (element, className) => element.classList.toggle(className);
hamburger.addEventListener('click', e => {
	toggleClass(hamburger, 'is-active');
	toggleClass(menu, 'overlayed');
	toggleClass(body, 'no-scroll');
});