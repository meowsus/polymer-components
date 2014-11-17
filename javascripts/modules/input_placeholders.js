WEBLINC.inputPlaceholders = (function () {
    'use strict';

    var init = function ($scope) {
        $('input, textarea', $scope).placeholder();
    };

    WEBLINC.modules.onDomReady(init);
    WEBLINC.modules.onDomUpdate(init);

    return {
        init: init
    };
}());
