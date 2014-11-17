WEBLINC.dialogs = (function () {
    'use strict';

    var DEFAULT_UI_OPTIONS = {
            draggable: false,
            minHeight: 20,
            modal: true,
            resizable: false,
            width: 'auto'
        },

        $loadingTemplate = $(JST['templates/loading_dialog']({ loadingImagePath: WEBLINC.paths.loadingImage })),

        $currentDialog = null,

        openDialog = function (content, uiDialogOptions, shouldTriggerDomUpdate) {
            var $content,
                promise,
                $thisDialog,
                isAsync,

                testContent = function () {
                    if (content instanceof jQuery) {
                        // assume content is a jQuery object
                        $content = content;
                        isAsync = false;
                    } else if (_.has(content, 'then')) {
                        // assume content is a promise object
                        promise = content;
                        isAsync = true;
                    } else {
                        // assume content is something else
                        throw new Error('WEBLINC.dialogs.openDialog: first argument must be a jQuery object or a promise object that passes a jQuery object when resolved');
                    }
                },

                setDefaults = function () {
                    uiDialogOptions = !uiDialogOptions ? DEFAULT_UI_OPTIONS : _.assign({}, DEFAULT_UI_OPTIONS, uiDialogOptions);
                    if (_.isUndefined(shouldTriggerDomUpdate)) { shouldTriggerDomUpdate = true; }
                },

                closeCurrentDialog = function () {
                    if ($currentDialog) {
                        $currentDialog.dialog('close').dialog('destroy').remove();
                        $currentDialog = null;
                    }
                },

                openNewDialog = function () {
                    $thisDialog = $content.dialog(uiDialogOptions);
                },

                setCurrentDialog = function () {
                    $currentDialog = $thisDialog;
                },

                overlayClicking = function () {
                    $('.ui-widget-overlay').on('click', closeCurrentDialog);
                },

                closeButtonClicking = function ($dialog) {
                    $('[data-dialog-close-button]', $dialog).on('click', function (e) {
                        e.preventDefault();
                        closeCurrentDialog();
                    });
                },

                triggerDomUpdate = function () {
                    if (shouldTriggerDomUpdate) {
                        WEBLINC.modules.domUpdate($thisDialog);
                    }
                },

                openLoadingDialog = function () {
                    _.delay(function () {
                        if (promise.state() === 'pending') {
                            openDialog($loadingTemplate, DEFAULT_UI_OPTIONS, false);
                        }
                    }, 300);
                },

                openDialogWhenReady = function () {
                    promise.done(function ($content) {
                        openDialog($content, uiDialogOptions, shouldTriggerDomUpdate);
                    });
                };

            testContent();
            setDefaults();

            if (isAsync) {
                openLoadingDialog();
                openDialogWhenReady();
                return;
            }

            closeCurrentDialog();
            openNewDialog();
            setCurrentDialog();
            overlayClicking();
            closeButtonClicking($thisDialog);
            triggerDomUpdate();
        };

    return {
        openDialog: openDialog
    };
}());
