function init() {

	var banner = $('.banner');
	var body = $('body');

	/* Initialize videojs */
	var video = videojs(document.querySelector('.video-js'), {
		autoplay: false,
		controls: true,
		preload: 'auto',
	});
	
	video.on('ended', function() {
		body.css('overflow', 'auto');
		banner.css({
			'opacity': '1',
			'visibility': 'visible',
			'z-index': '3'
		});
	})

	video.on('play', function() {
		body.css('overflow', 'hidden');
	})

	video.on('pause', function() {
		body.css('overflow', 'auto');
	})

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