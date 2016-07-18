// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Write your JS here
$('html').removeClass('no-js');

// SOME BROWSER/OS DETECTIONS
if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    document.body.className += "ios";
} else if (navigator.userAgent.match(/Mac OS X/i)) {
    document.body.className += "mac";
} else {
    document.body.className += "pc";
}
if (navigator.userAgent.match(/MSIE 9/i)) {
    document.body.className += " ie9";
}
