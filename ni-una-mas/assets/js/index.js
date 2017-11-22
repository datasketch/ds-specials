/* Set the height for the story boxes on resize */
function handleResize() {
	var storyBoxHeight = Math.floor($('.stories-container').height() * 1)
	$('.story-box').css('height', storyBoxHeight + 'px');
}
function init() {
	/* Handle resize */
	handleResize();
	window.addEventListener('resize', handleResize);

	/* Initialize videojs */
	var video = videojs(document.querySelector('.video-js'), {
		autoplay: false,
		controls: true,
		preload: 'auto',
	});
	
	/* Setup the carousel for the stories section*/
	$('.stories-carousel').owlCarousel({
		dots: false,
		items: 1,
		nav: true,
		navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		slideBy: 1,
		responsive: {
			768: {
				items: 3,
				nav: false
			}
		}
	});

	/* Handle tales overlay */
	var tale = undefined;
	$('.tale-item').click(function(event) {
		event.preventDefault();
		var target = event.target;
		tale = $(target).attr('data-tale');
		if (!tale) {
			tale = $(target).parent().attr('data-tale');
		}
		$('body').css('overflow', 'hidden');
		$('#' + tale).toggleClass('opened');
	})
	$('.close-overlay').click(function(event) {
		event.preventDefault();
		$('#' + tale).toggleClass('opened');
		$('body').css('overflow', 'auto');
	})
}

/* When DOM loaded */
$(document).ready(function() {
	init();
})