var express = require('express');
var sse = require('sse-broadcast')();
var uuid = require('node-uuid');

var app = express();
app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

/* Routes */
app.get('/randnum', function (req, res) {
  sse.subscribe('randnum', res);
});

app.get('/randuuid', function (req, res) {
  sse.subscribe('randuuid', res);
});

/* Random value generation */
var generateRandomDelay = function () {
  var delay = Math.floor(Math.random() * 3001) + 500;
  return delay;
};

var generateRandomNumber = function () {
  return Math.ceil(Math.random() * 100);
};
var randNum = generateRandomNumber();
var messageRandomNumber = function () {
  randNum = generateRandomNumber();
  // sse.publish('randnum', 'update', randNum);
  sse.publish('randnum', { data: randNum });
  setTimeout(messageRandomNumber, generateRandomDelay());
};
setTimeout(messageRandomNumber, generateRandomDelay());

var generateRandomUUID = function () {
  return uuid.v4();
};
var randUUID = generateRandomUUID();
var messageRandomUUID = function () {
  randUUID = generateRandomUUID();
  // sse.publish('randuuid', 'update', randUUID);
  sse.publish('randuuid', { data: randUUID });
  setTimeout(messageRandomUUID, generateRandomDelay());
};
setTimeout(messageRandomUUID, generateRandomDelay);

/* Initialize server */
app.listen(3000, function () {
  console.log('Listening on port 3000');
});
