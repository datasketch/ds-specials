var sps = 'https://script.google.com/macros/s/AKfycbwo7y4-8Jnm8sgRZCa6GTn1CHz2D4LHeKd3hWatKMil7AiBxRg/exec'
var counter = document.querySelector('.intro__banner .banner__title')

if (counter) {
  if (window.fetch) {
    fetch(sps)
      .then(handleResponse)
      .then(json => setCounterValue(json.count, true))
      .catch(error => setCounterValue('4xx'))
  } else {
    var request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        var json = JSON.parse(request.responseText)
        setCounterValue(json.count, true)
      } else {
        setCounterValue('4xx')
      }
    }
    request.open('GET', sps)
    request.send()
  }
}

function setCounterValue (value, interactive) {
  if (!interactive) {
    counter.textContent = value
    return
  }
  var race = new CountUp(counter, 0, value, 0, 1.5, {});
  if (!race.error) {
    race.start()
  }
}

function handleResponse (response) {
  if (response.ok) {
    return response.json()
  }
  throw new Error()
}
