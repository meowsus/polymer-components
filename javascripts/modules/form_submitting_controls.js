WEBLINC.formSubmittingControls = (function () {
    'use strict';

    var init = function ($scope) {
            var elementSelector = '[data-form-submitting-control]',
                $formWithSubmitControl = $('form', $scope).has(elementSelector);

            if (_.isEmpty($formWithSubmitControl)) { return; }

            $formWithSubmitControl
                .on('change', elementSelector, _.debounce(function () {
                    $(this).closest('form').trigger('submit');
                }, 500))
                .on('input', elementSelector, _.debounce(function () {
                    $(this).closest('form').trigger('submit');
                }, 1000));
        };

    WEBLINC.modules.onDomReady(init);
    WEBLINC.modules.onDomUpdate(init);

    return {
        init: init
    };
}());
