WEBLINC.deletionForms = (function () {
    'use strict';

    var MESSAGE = 'Are you sure you want to delete this?',

        promptForConfirmation = function () {
            return window.confirm(MESSAGE);
        },

        listenForSubmissions = function ($forms) {
            $forms.on('submit', promptForConfirmation);
        },

        init = function ($scope) {
            var $deletionForms = $('[data-deletion-form]', $scope);

            if (_.isEmpty($deletionForms)) { return; }

            listenForSubmissions($deletionForms);
        };

    WEBLINC.modules.onDomReady(init);
    WEBLINC.modules.onDomUpdate(init);

    return {
        init: init
    };
}());
