function calculateMargin() {
	var headerHeight = $('header').height();
	$('main').css('margin-top', headerHeight + 'px');
}

$(document).ready(function() {
	calculateMargin();
	window.addEventListener('resize', calculateMargin);
})