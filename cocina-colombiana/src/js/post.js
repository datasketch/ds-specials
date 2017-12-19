const wrapper = document.querySelector('#wrapper');
const headerHeight = document.querySelector('.nav').clientHeight;

const margin = () => {
	wrapper.style.marginTop = `${headerHeight}px`;
	if (window.location.pathname == '/recetas-colombianas.html') {
		iframe()
	}
}

const iframe = () => {
	const windowHeight = window.innerHeight;
	const iframeHeight = windowHeight - headerHeight;
	document.querySelector('.app-frame').style.height = `${iframeHeight}px`;
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