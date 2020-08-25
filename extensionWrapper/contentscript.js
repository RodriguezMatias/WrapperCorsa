
var s = document.createElement('script');
console.log("inyectando...");
s.src = chrome.extension.getURL('core.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};