# speech-to-text-stream

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Simple text-stream wrapper around the WebSpeech SpeechRecognizer API for Google Chrome.

## Usage

```javascript
var recognizer = new SpeechToTextStream()

button.onclick = function () { 
  recognizer.start() // Can only be started by user interaction
}

recognizer.on('data', function (token) {
  // token is one spoken word
})

recognizer.on('speechstart', function (token) {
  // speech has been recognized
})

recognizer.on('speechend', function (token) {
  // speech has stopped or paused
})
```

