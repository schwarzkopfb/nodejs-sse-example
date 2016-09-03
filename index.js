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
var updateRandomNumber = function () {
  randNum = generateRandomNumber();
  sse.publish('randnum', 'update', randNum);
  setTimeout(updateRandomNumber, generateRandomDelay());
};
setTimeout(updateRandomNumber, generateRandomDelay());

var generateRandomUUID = function () {
  return uuid.v4();
};
var randUUID = generateRandomUUID();
var updateRandomUUID = function () {
  randUUID = generateRandomUUID();
  sse.publish('randuuid', 'update', randUUID);
  setTimeout(updateRandomUUID, generateRandomDelay());
};
setTimeout(updateRandomUUID, generateRandomDelay);

/* Initialize server */
app.listen(3000, function () {
  console.log('Listening on port 3000');
});
