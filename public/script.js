window.onload = function () {
  var numSource = new EventSource('/randnum');
  var uuidSource = new EventSource('/randuuid');

  // numSource.addEventListener('update', function (e) {
  //   document.getElementById('randNum').innerHTML = e.data;
  // });
  //
  // uuidSource.addEventListener('update', function (e) {
  //   document.getElementById('randUUID').innerHTML = e.data;
  // });

  numSource.onmessage = function (e) {
    document.getElementById('randNum').innerHTML = e.data;
  };

  uuidSource.onmessage = function (e) {
    document.getElementById('randUUID').innerHTML = e.data;
  };
};
