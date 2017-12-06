const nav = document.querySelector('.nav');

function affix() {
	const scrollValue = window.scrollY;
	if (scrollValue > 100) {
		nav.classList.add('scrolled');
	}
	if (scrollValue === 0) {
		nav.classList.remove('scrolled');	
	}
}

affix();
window.addEventListener('scroll', affix);