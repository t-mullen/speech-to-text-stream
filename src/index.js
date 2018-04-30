/* global webkitSpeechRecognition */

var inherits = require('inherits')
var Readable = require('readable-stream').Readable

inherits(SpeechToTextStream, Readable)

function SpeechToTextStream () {
  var self = this
  if (!(self instanceof SpeechToTextStream)) return new SpeechToTextStream()

  Readable.call(self, {
    objectMode: true
  })

  var recognizer = new webkitSpeechRecognition()

  recognizer.continuous = true
  recognizer.interimResults = false

  var pauseTimeout = null
  recognizer.onspeechstart = function () {
    self.emit('speechstart')
    if (pauseTimeout) clearTimeout(pauseTimeout)
  }
  recognizer.onspeechend = function () {
    self.emit('speechend')
  }

  var offset = 0
  recognizer.onresult = function (event) {
    var tokens = event.results[offset++][0].transcript.trim().split(' ')
    tokens.forEach(function (token) {
      console.log(token)
      self.push(token)
    })
  }

  self._recognizer = recognizer
}

SpeechToTextStream.prototype._read = function () {}

SpeechToTextStream.prototype.start = function () {
  var self = this
  self._recognizer.start()
}

SpeechToTextStream.prototype.stop = function () {
  var self = this
  self._recognizer.stop()
}

SpeechToTextStream.prototype.abort = function () {
  var self = this
  self._recognizer.abort()
}

module.exports = SpeechToTextStream
