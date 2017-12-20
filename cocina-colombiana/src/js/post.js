const wrapper = document.querySelector('#wrapper');
const headerHeight = document.querySelector('.nav').clientHeight;

const margin = () => {
	wrapper.style.marginTop = `${headerHeight}px`;
	if (window.location.pathname == '/cocina-colombiana/recetas-colombianas.html') {
		iframe();
	}
}

const iframe = () => {
	console.log('Building iframe...')
	const base = 'https://randommonkey.shinyapps.io/cocina-colombiana/';
	const id = window.location.search;
	const windowHeight = window.innerHeight;
	const iframeHeight = windowHeight - headerHeight;
	const iframe = document.querySelector('.app-frame')
	iframe.style.height = `${iframeHeight}px`;
	iframe.setAttribute('src', `${base}${id}`);
}

(function() {
	margin();
	window.addEventListener('resize', margin);
	if (window.List) {
		const warning = document.querySelector('.no-results');
		const options = { valueNames: ['ingredient-name'] };
		const glossary = new List('glossary', options);
		glossary.on('searchComplete', function(results) {
			if (!results.visibleItems.length) {
				warning.style.display = 'block';
			} else {
				warning.style.display = 'none';
			}
		})
	}
})();