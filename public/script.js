window.onload = function () {
  var numSource = new EventSource('/randnum');
  var uuidSource = new EventSource('/randuuid');

  numSource.onmessage = function (e) {
    document.getElementById('randNum').innerHTML = e.data;
  };

  uuidSource.onmessage = function (e) {
    document.getElementById('randUUID').innerHTML = e.data;
  };
};
