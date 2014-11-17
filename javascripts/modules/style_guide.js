WEBLINC.styleGuide = (function () {
    'use strict';

    var initDialog = function () {
            var $content = $(JST['templates/style_guide_dialog_content']());

            $('.style-guide-ui-dialog-example').on('click', function () {
                WEBLINC.dialogs.openDialog($content);
            });
        },

        initAutocomplete = function () {
            var data = [
                'Small red sweater',
                'Medium red sweater',
                'Large red sweater',
                'Small blue sweater',
                'Medium blue sweater',
                'Large blue sweater',
                'Small green sweater',
                'Medium green sweater',
                'Large green sweater',
                'Small white sweater',
                'Medium white sweater',
                'Large white sweater',
                'Small black sweater',
                'Medium black sweater',
                'Large black sweater',
                'Small yellow sweater',
                'Medium yellow sweater',
                'Large yellow sweater',
            ];

            $('.style-guide-ui-autocomplete-example').autocomplete({
                source: data
            });
        },

        init = function ($scope) {
            var $styleGuideView = $('.wl-style-guide-view', $scope);

            if (_.isEmpty($styleGuideView)) { return; }

            initDialog();
            initAutocomplete();
        };

    WEBLINC.modules.onDomReady(init);

    return {
        init: init
    };
}());
