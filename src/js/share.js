
setShareLinks();

function socialWindow(url) {
  var left = (screen.width - 570) / 2;
  var top = (screen.height - 570) / 2;
  var params =
    "menubar=no,toolbar=no,status=no,width=570,height=570,top=" +
    top +
    ",left=" +
    left;
  window.open(url, "NewWindow", params);
}

function setShareLinks() {
  var pageUrl = encodeURIComponent(document.URL);
  var tweet = encodeURIComponent(
    document.getElementById('post-title').textContent + " by @StefanvHaas"
  );

  var facebookUrl = pageUrl + "&picture=" + document.getElementById('og-image').getAttribute('content') + "&description=" + document.getElementById('og-description').getAttribute('content');

  document.getElementById('share-fb').addEventListener("click", function () {
    url = "https://www.facebook.com/sharer.php?u=" + facebookUrl;
    socialWindow(url);
  });

  document.getElementById('share-tw').addEventListener("click", function () {
    url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + tweet;
    socialWindow(url);
  });

  document.getElementById('share-in').addEventListener("click", function () {
    url = "https://www.linkedin.com/share?mini=true&url=" + pageUrl;
    socialWindow(url);
  });
}
