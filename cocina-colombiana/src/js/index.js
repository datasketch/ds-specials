const nav = document.querySelector('.nav');
const carousel = $('.owl-carousel');

const affix = () => {
	window.scrollY > (window.innerHeight - nav.clientHeight) ? 
		nav.classList.add('scrolled') :
		nav.classList.remove('scrolled');	
}

affix();

carousel.owlCarousel({
	autoplay: true,
	items: 1,
});

window.addEventListener('scroll', affix);