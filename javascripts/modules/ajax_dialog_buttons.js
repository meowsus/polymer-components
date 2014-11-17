WEBLINC.ajaxDialogButtons = (function () {
    'use strict';

    var MINIMUM_BREAK_POINT = 'medium',

        getUrl = function (element) {
            return element.href;
        },

        getContent = function (url) {
            var gettingContent = $.Deferred();

            $.get(url).done(function (content) {
                var $content = $(content).wrap('<div>').parent();
                gettingContent.resolve($content);
            });

            return gettingContent.promise();
        },

        getUiDialogOptions = function (element) {
            return $(element).data('ajaxDialogButton');
        },

        onButtonClick = function (event) {
            if (WEBLINC.breakPoints.currentlyLessThan(MINIMUM_BREAK_POINT)) { return true; }

            var url = getUrl(event.target),
                isSafeRequest = window.location.protocol === event.target.protocol,
                content,
                uiDialogOptions;

            if (isSafeRequest) {
                content = getContent(url);
                uiDialogOptions = getUiDialogOptions(event.target);

                WEBLINC.dialogs.openDialog(content, uiDialogOptions);

                event.preventDefault();
            }
        },

        init = function ($scope) {
            var $buttonsInScope = $('a[data-ajax-dialog-button]', $scope);

            if (_.isEmpty($buttonsInScope)) { return; }

            $buttonsInScope.on('click', onButtonClick);
        };

    WEBLINC.modules.onDomReady(init);
    WEBLINC.modules.onDomUpdate(init);

    return {
        init: init
    };
}());
