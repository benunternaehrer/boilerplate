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

// CHECK IF JS AVAILABLE
$('html').removeClass('no-js');

// SOME BROWSER/OS DETECTIONS
if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    document.body.className += "ios";
} else if (navigator.userAgent.match(/Mac OS X/i)) {
    document.body.className += "mac";
} else {
    document.body.className += "pc";
}

// IE DETECTION
function GetIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");
    // If IE, return version number.
    if (Idx > 0)   {
        return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
    } else if (!!navigator.userAgent.match(/Trident\/7\./)) {
        // If IE 11 then look for Updated user agent string.
        return 11;
    } else {
        return 0; //It is not IE
    }
}

if (GetIEVersion() > 0) {
    document.body.className += " ie" + GetIEVersion();
}


//////////////////////
// MEDIA QUERIES
//////////////////////

function mediaQuerie(){
    var mq = window.getComputedStyle(document.querySelector('body'), ':after').getPropertyValue('content').replace(/["']/g, "");
    mq = parseInt(mq);
    return mq;
}

var getViewport = function() {
    this.currentSize =  mediaQuerie();
    this.getViewport = function (){
        if (mediaQuerie() != this.currentSize) {
            this.currentSize = mediaQuerie();
            return(this.currentSize);
        }
    };
};

// // USAGE
// $(window).resize(function(event) {
//     var viewport = getViewport();
//     if (viewport === currentSize) {
//         if (currentSize < 4) {
//         } else  {
//         }
//     }
// });


//////////////////////
// CUSTOM JS
//////////////////////
