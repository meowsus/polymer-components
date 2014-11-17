WEBLINC.queryString = (function () {
    'use strict';

    var getValue = function (name) {
        var match = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };

    return {
        getValue: getValue
    };
}());
