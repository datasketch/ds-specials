const nav = document.querySelector('.nav');
console.dir(nav)
const affix = () => {
	window.scrollY > (window.innerHeight - nav.clientHeight) ? 
		nav.classList.add('scrolled') :
		nav.classList.remove('scrolled');	
}

affix();
window.addEventListener('scroll', affix);