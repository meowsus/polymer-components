WEBLINC.formValidation = (function () {
    'use strict';

    var setup = function () {
            var CREDIT_CARD_NUMBER_WHITE_LIST = ['1', '2', '3'],

                setDefaults = function () {
                    $.validator.setDefaults({
                        meta: 'validation',
                        ignoreTitle: true,
                        errorClass: 'error'
                    });
                },

                customize = function () {
                    $.validator.addMethod('extendedCreditCard', function (value, element) {
                        if (_.contains(CREDIT_CARD_NUMBER_WHITE_LIST, value)) {
                            return true;
                        } else {
                            return $.validator.methods.creditcard.call(this, value, element);
                        }
                    }, $.validator.messages.creditcard);
                };

            setDefaults();
            customize();
        },

        init = function ($scope) {
            $('form', $scope).each(function () {
                $(this).validate();
            });
        };

    WEBLINC.modules.onDomReady(setup, init);
    WEBLINC.modules.onDomUpdate(init);

    return {
        init: init
    };
}());
