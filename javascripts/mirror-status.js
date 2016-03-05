function updateMirrorStatus() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.responseType = 'json';

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 1 || xmlhttp.readyState == 4) {
      writeMirrorStatus(xmlhttp);
    }
  };

  xmlhttp.open('GET', 'http://angusgriffith.com/mathics_mirror_status.json', true);
  xmlhttp.send();
}

function writeMirrorStatus(json) {
  var mirrors = document.getElementById("mirrors").getElementsByTagName("li");
  for (var i = 0; i < mirrors.length; i++) {
    var mirror = mirrors[i];

    if (json.response == null) {
      mirror.innerHTML = mirror.innerHTML + "<img src='images/loading.gif' alt='mirror status: checking' />";
    }
    else {
      var url = mirror.textContent;
      var stat = json.response[url];

      if (stat) {
        mirror.children[1].src = 'images/success.png';
        mirror.children[1].alt = 'mirror status: OK';
      } else {
        mirror.children[1].src = 'images/fail.png';
        mirror.children[1].alt = 'mirror status: fail';
      }
    }
  }
}
