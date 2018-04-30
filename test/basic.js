var test = require('tape')
var SpeechToTextStream = require('./../')

test('basic manual test', function (t) {
  var r = new SpeechToTextStream()

  var startButton = document.createElement('button')
  document.body.appendChild(startButton)

  startButton.onclick = function () {
    r.start()
  }
})