/* Set the height for the story boxes on resize */
function handleResize() {
	var storyBoxHeight = Math.floor($('.stories-container').height() * 1)
	$('.story-box').css('height', storyBoxHeight + 'px');
}
function init() {
	/* Invoke initial functions*/
	handleResize();
	window.addEventListener('resize', handleResize);
	
	/* Setup the carousel for the stories section*/
	$('.stories-carousel').owlCarousel({
		dots: false,
		items: 1,
		nav: true,
		navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		slideBy: 1,
		responsive: {
			768: {
				items: 2,
				slideBy: 2,
			},
			992: {
				items: 3,
				slideBy: 3
				}
			}
		});
}

/* When DOM loaded */
$(document).ready(function() {
	init();
})