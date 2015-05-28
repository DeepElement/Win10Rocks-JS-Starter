function loadScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    script.onreadystatechange = callback;
    script.onload = callback;

    head.appendChild(script);
}

function loadStyle(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.href = url;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";

    link.onreadystatechange = callback;
    link.onload = callback;

    head.appendChild(link);
}

// Load Styles
loadStyle('/vendor/WinJS-4.0.0-preview/css/ui-dark.css');
loadStyle('/css/default.css');


// Load scripts
loadScript("/vendor/WinJS-4.0.0-preview/js/WinJS.js");
loadScript("/.metro.node.js");
loadScript("/default.js");
loadScript("/control/navigator.js");