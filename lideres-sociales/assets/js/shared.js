$(document).ready(function() {
	$('.hamburger').click(function () {
  	$(this).toggleClass('is-active');
  	$('.full-menu').toggleClass('open');
  	$('.topnav').toggleClass('open');
	});
  $('.topnav').affix({ offset: { top: 100 }});

  $('main').css('padding-bottom', $('footer').height());

  $(window).resize(function() {
  	var $footerHeight = $('footer').height();
  	$('main').css('padding-bottom', $footerHeight);
  })
})