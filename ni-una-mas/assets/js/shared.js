/* Handle the scroll of the page while loading */
window.onload = function(e) {
	document.getElementById('overlay').style.display = "none";
	document.body.style.overflow = "auto";
}

/* Setup the handler for the hamburger button */
var $hamburger = $('.hamburger');
$hamburger.on('click', function() {
	$(this).toggleClass('is-active');
	$('.menu').toggleClass('opened');
});