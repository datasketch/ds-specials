const wrapper = document.querySelector('#wrapper');
const headerHeight = document.querySelector('header').clientHeight;

const margin = () => {
	wrapper.style.marginTop = `${headerHeight}px`;
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