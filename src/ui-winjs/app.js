function loadResource(url, type, callback) {
    var head = document.getElementsByTagName('head')[0];
    switch (type) {
        case "script":
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;

            script.onreadystatechange = callback;
            script.onload = callback;

            head.appendChild(script);
            break;
        case "style":
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.href = url;
            link.type = "text/css";
            link.rel = "stylesheet";
            link.media = "screen,print";

            link.onreadystatechange = callback;
            link.onload = callback;

            head.appendChild(link);
            break;
    }
}

// Load Styles
loadResource('/vendor/WinJS-4.0.0-preview/css/ui-dark.css', 'style');
loadResource('/css/default.css', 'style');

// Load scripts
loadResource("/vendor/WinJS-4.0.0-preview/js/WinJS.js", 'script');
loadResource("/.metro.node.js", 'script');
loadResource("/components/navigationProvider.js", 'script');
loadResource("/entry.js", 'script');
loadResource("/view/navigator.js", 'script');