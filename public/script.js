var numSource = new EventSource('/randnum');
var uuidSource = new EventSource('/randuuid');

numSource.addEventListener('message', function (e) {
	var num = JSON.parse(e.data);
  document.getElementById('randNum').innerHTML = num.num;
});

uuidSource.addEventListener('message', function (e) {
  var uuid = JSON.parse(e.data);
  document.getElementById('randUUID').innerHTML = uuid.uuid;
});
