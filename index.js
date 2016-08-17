var express = require('express');
var sse = require('./sse');
var uuid = require('node-uuid');

var app = express();
app.use(express.static('public'));
app.use(sse);
app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

var connectionsRandNum = [];
var connectionsRandUUID = [];

var generateRandomDelay = function () {
  var delay = Math.floor(Math.random() * 3001) + 500;
  console.log(delay);
  return delay;
};

var generateRandomNumber = function () {
  return Math.ceil(Math.random() * 100);
};
var updateRandomNumber = function () {
  randNum.num = generateRandomNumber();
  console.log('Updated rand num to', randNum.num);
  console.log('Num randNum connections:', connectionsRandNum.length);
  for (var i = 0; i < connectionsRandNum.length; i++) {
    connectionsRandNum[i].sseSend(randNum);
  }
  setTimeout(updateRandomNumber, generateRandomDelay());
};
var randNum = {
  'num': generateRandomNumber()
};
setTimeout(updateRandomNumber, generateRandomDelay());

var generateRandomUUID = function () {
  return uuid.v4();
};
var updateRandomUUID = function () {
  randUUID.uuid = generateRandomUUID();
  console.log('Updated UUID to', randUUID.uuid)
  console.log('Num UUID connections:', connectionsRandUUID.length);
  for (var i = 0; i < connectionsRandUUID.length; i++) {
    connectionsRandUUID[i].sseSend(randUUID);
  }
  setTimeout(updateRandomUUID, generateRandomDelay());
};
var randUUID = {
  'uuid': generateRandomUUID()
};
setTimeout(updateRandomUUID, generateRandomDelay);

app.get('/randnum', function (req, res) {
  res.sseSetup();
  res.sseSend(randNum);
  connectionsRandNum.push(res);
});

app.get('/randuuid', function (req, res) {
  res.sseSetup();
  res.sseSend(randUUID);
  connectionsRandUUID.push(res);
})

app.listen(3000, function () {
  console.log('Listening on port 3000');
});
