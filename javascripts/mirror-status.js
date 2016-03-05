function getMirrorStatus(url, callback) {
  var mirrorStatus = new XMLHttpRequest();
  mirrorStatus.responseType = 'json';
  mirrorStatus.onreadystatechange = function() {
    if (mirrorStatus.readyState == 4) {
      callback(mirrorStatus.response[url]);
    }
  };
  mirrorStatus.open('GET', 'http://angusgriffith.com/mathics_mirror_status.json', true);
  mirrorStatus.send();
}

function writeMirrorStatus(mirror) {
  mirror.innerHTML = mirror.innerHTML + '<img src="images/loading.gif" />';
  getMirrorStatus(url = mirror.textContent,
    callback = function(status) {
      if (status) {
        mirror.children[1].src = 'images/success.png';
      } else {
        mirror.children[1].src = 'images/fail.png';
      }
    }
  );
}

function updateMirrorStatus() {
  mirrors = document.getElementById("mirrors").getElementsByTagName("li");
  for (var i = 0; i < mirrors.length; i++) {
    console.log("Checking", mirrors[i].textContent);
    writeMirrorStatus(mirrors[i]);
  }
}
