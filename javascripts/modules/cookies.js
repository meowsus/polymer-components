WEBLINC.cookies = (function () {
    'use strict';

    var trimAndSplit = function (string) {
            return $.trim(string).split('=');
        },

        create = function (name, value, days) {
            // adapted from http://www.quirksmode.org/js/cookies.html
            var date,
                expires;

            if (days) {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toGMTString();
            } else {
                expires = '';
            }

            document.cookie = name + '=' + value + expires + '; path=/';
        },

        read = function (name) {
            return _.object(_.map(document.cookie.split(';'), trimAndSplit))[name] || null;
        };

    return {
        create: create,
        read: read
    };
}());
