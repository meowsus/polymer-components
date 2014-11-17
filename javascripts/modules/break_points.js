WEBLINC.breakPoints = (function () {
    'use strict';

    var WIDTHS = {
            small: 0,
            medium: 760,
            wide: 960,
        },
        IE_8_MATCHES = ['small'],
        IE_9_MATCHES = ['small', 'medium', 'wide'],

        breakPoints,
        currentMatches = [],

        supportsMediaQueries = Modernizr.mq('only all'),
        supportsMatchMedia = Boolean(window.matchMedia),
        fullSupport = false,

        createBreakPoints = function () {
            if (supportsMatchMedia) {
                breakPoints = _.reduce(WIDTHS, function (obj, widthValue, widthName) {
                    obj[widthName] = window.matchMedia('(min-width: ' + widthValue + 'px)');
                    return obj;
                }, {});
            }
        },

        queryCurrentMatches = function () {
            currentMatches = _.reduce(breakPoints, function (newArray, mediaQuery, sizeName) {
                if (mediaQuery.matches) {
                    newArray.push(sizeName);
                }
                return newArray;
            }, []);
        },

        getInitialMatches = function () {
            if (!supportsMediaQueries) {
                currentMatches = IE_8_MATCHES;
                return;
            }

            if (!supportsMatchMedia) {
                currentMatches = IE_9_MATCHES;
                return;
            }

            queryCurrentMatches();
            fullSupport = true;
        },

        currentlyLessThan = function (widthName) {
            return !_.contains(currentMatches, widthName);
        },

        init = function () {
            createBreakPoints();
            getInitialMatches();

            if (fullSupport) {
                $(window).on('resize', _.debounce(queryCurrentMatches, 250));
            }
        };

    WEBLINC.modules.onDomReady(init);

    return {
        currentlyLessThan: currentlyLessThan,
        init: init
    };
}());
