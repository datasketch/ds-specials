$(document).ready(function() {
  new WOW().init();
  if ($(window).width() < 768) {
    $('#app_link').attr('href','')
  } else {
    $('#app_link').attr('href','app.html')
  }
  $(window).resize(function() {
    var innerWidth = $(this).width();
    if (innerWidth < 768) {
      $('#app_link').attr('href','')
    } else {
      $('#app_link').attr('href','app.html')
    }
  })
})