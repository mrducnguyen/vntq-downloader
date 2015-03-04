function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
var rqBaseUrl = helpers.getBaseUrl();
loadCss(rqBaseUrl + '../libs/bootstrap/dist/css/bootstrap.min.css');
loadCss(rqBaseUrl + 'css/style.css');