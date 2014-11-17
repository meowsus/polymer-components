WEBLINC.popupButtons = (function () {
    'use strict';

    var openPopup = function (url) {
            window.open(url, '', 'width=640, height=480');
        },

        addClickListener = function ($buttons) {
            $buttons.on('click', function (e) {
                e.preventDefault();
                openPopup(this.href);
            });
        },

        init = function ($scope) {
            var $buttons = $('[data-popup-button]', $scope);

            if (_.isEmpty($buttons)) { return; }

            addClickListener($buttons);
        };

    WEBLINC.modules.onDomReady(init);
    WEBLINC.modules.onDomUpdate(init);

    return {
        init: init
    };
}());
