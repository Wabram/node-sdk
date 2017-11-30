'use strict';
require('dotenv').config({ silent: true }); // optional, handy for local development
const SpeechToText = require('watson-developer-cloud/speech-to-text/v1');
const LineIn = require('line-in'); // the `mic` package also works - it's more flexible but requires a bit more setup
const wav = require('wav');

const speechToText = new SpeechToText({
  // if left unspecified here, the SDK will fall back to the SPEECH_TO_TEXT_USERNAME and SPEECH_TO_TEXT_PASSWORD
  // environment properties, and then Bluemix's VCAP_SERVICES environment property
  // username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
  // password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
});

const lineIn = new LineIn(); // 2-channel 16-bit little-endian signed integer pcm encoded audio @ 44100 Hz

const wavStream = new wav.Writer({
  sampleRate: 44100,
  channels: 2
});

const recognizeStream = speechToText.createRecognizeStream({
  content_type: 'audio/wav'
});

lineIn.pipe(wavStream);

wavStream.pipe(recognizeStream);

recognizeStream.pipe(process.stdout);
