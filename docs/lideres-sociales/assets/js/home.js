$(document).ready(function() {
  new WOW().init();
  createCalendar()
  if ($(window).width() < 768) {
    $('#app_link').attr('href','')
  } else {
    $('#app_link').attr('href','app.html')
  }
  
  resize()
})

function resize () {
  $(window).resize(function() {
    var innerWidth = $(this).width();
    if (innerWidth < 768) {
      $('#app_link').attr('href','')
    } else {
      $('#app_link').attr('href','app.html')
    }
  })
}

function createCalendar () {
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/10Pr1OU9XMq__YpuRCEE0Smza6nbrEmuuNeUTT-XEuEU/edit?usp=sharing',
    callback: function (data, tabletop) {
      const schedule = tabletop.sheets('eventos-lideres').all()
        .filter(e => e.FECHA.match(/^\d/))
        .map(function (e, index) {
          var date = e.FECHA.match(/^(\d+)\-(\d+)\-(\d+)$/)
          return {
            calendarId: '1',
            category: 'allday',
            id: index.toString(),
            isAllDay: true,
            isReadOnly: true,
            location: e['LUGAR DE REALIZACIÓN'] ? e['LUGAR DE REALIZACIÓN'].trim() + (e.CIUDAD ? ', ' + e.CIUDAD.trim() : '') : e.CIUDAD.trim(),
            title: e.NOMBRE.trim(),
            start: new Date(+date[1], +date[2] - 1, +date[3])
          }
        })
      var calendar = new tui.Calendar(document.getElementById('calendar'), {
        defaultView: 'week',
        taskView: false,
        useDetailPopup: true,
        week: {
          daynames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        }
      })
      calendar.createSchedules(schedule)
    }
  })
}