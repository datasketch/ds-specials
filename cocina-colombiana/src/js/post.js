const wrapper = document.querySelector('#wrapper');
const headerHeight = document.querySelector('header').clientHeight;

const margin = () => {
	wrapper.style.marginTop = `${headerHeight}px`;
}

(function() {
	margin();
	window.addEventListener('resize', margin);
})();