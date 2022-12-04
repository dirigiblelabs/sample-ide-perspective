/*
 * Copyright (c) 2010-2021 SAP SE or an SAP affiliate company and Eclipse Dirigible contributors
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-FileCopyrightText: 2010-2021 SAP SE or an SAP affiliate company and Eclipse Dirigible contributors
 * SPDX-License-Identifier: EPL-2.0
 */
let examplePerspective = angular.module("example", ["ngResource", "ideLayout", "ideUI"]);

examplePerspective.config(["messageHubProvider", function (messageHubProvider) {
    messageHubProvider.eventIdPrefix = 'example';
}]);

// Initialize controller
examplePerspective.controller("ExampleViewController", ["$scope", "messageHub", function ($scope, messageHub) {

    $scope.formItems = [
        {
            id: "fdti1",
            type: "input",
            label: "Test input 1",
            required: true,
            placeholder: "test placeholder",
            minlength: 3,
            maxlength: 6,
            inputRules: {
                excluded: ['excludedword'],
                patterns: ['^[^/]*$'],
            },
            value: '',
            visibility: {
                hidden: true,
                id: "fdtd1",
                value: 1,
            },
        },
        {
            id: "fdti2",
            type: "input",
            label: "Test input 2",
            placeholder: "test placeholder",
            value: 'example',
        },
        {
            id: "fdtc1",
            type: "checkbox",
            label: "Test checkbox 1",
            value: false,
            visibility: {
                hidden: false,
                id: "fdti1",
                value: "test1",
            }
        },
        {
            id: "fdtd1",
            type: "dropdown",
            label: "Test dropdown",
            required: true,
            value: undefined,
            items: [
                {
                    label: "First item",
                    value: 0,
                },
                {
                    label: "Second item",
                    value: 1,
                },
                {
                    label: "Third item",
                    value: 2,
                }
            ]
        },
        {
            id: "fdtr1",
            type: "radio",
            required: true,
            value: '',
            items: [
                {
                    id: "rsi1",
                    label: "First radio",
                    value: "firstRadio",
                },
                {
                    id: "rsi2",
                    label: "Second radio",
                    value: "secondRadio",
                },
                {
                    id: "rsi3",
                    label: "Third radio",
                    value: "thirdRadio",
                }
            ]
        },
        {
            id: "fdtta1",
            type: "textarea",
            label: "Test text area 1",
            placeholder: "Test placeholder",
            rows: 10,
            inputRules: {
                excluded: ['ex'],
            },
            value: 'example',
        },
    ];

    // setTimeout(function () {
    //     messageHub.showBusyDialog(
    //         "bdt",
    //         "Loading examples",
    //         'example.busy.closed'
    //     );
    // }, 2000);

    // setTimeout(function () {
    //     messageHub.hideBusyDialog(
    //         "bdt",
    //     );
    // }, 3000);

    // setTimeout(function () {
    //     messageHub.showAlertSuccess(
    //         "Success",
    //         "This is good!"
    //     );
    // }, 2000);

    // setTimeout(function () {
    //     messageHub.showDialog(
    //         "Dialog example",
    //         'Clicking "Ok" will result in a statusbar message, while "Cancel" will result in an statusbar error warning.',
    //         // ['First line', 'Second line', 'Third line'],
    //         [{
    //             id: "b1",
    //             type: "emphasized",
    //             label: "Ok",
    //         },
    //         {
    //             id: "b2",
    //             type: "transparent",
    //             label: "Cancel",
    //         },
    //         {
    //             id: "b3",
    //             type: "normal",
    //             label: "Undecided",
    //         }],
    //         "example.dialog.test"
    //     );
    // }, 2000);

    // setTimeout(function () {
    //     messageHub.showFormDialog(
    //         "testForm1",
    //         "Form dialog example",
    //         $scope.formItems,
    //         [{
    //             id: "b1",
    //             type: "emphasized",
    //             label: "Ok",
    //             whenValid: true
    //         },
    //         {
    //             id: "b2",
    //             type: "transparent",
    //             label: "Cancel",
    //         }],
    //         "example.formDialog.test",
    //         "Sending information..."
    //     );
    // }, 2000);

    // setTimeout(function () {
    //     messageHub.showLoadingDialog(
    //         "epeld",
    //         "Loading examples",
    //         'Loading perspective...',
    //     );
    // }, 1000);

    // setTimeout(function () {
    //     messageHub.updateLoadingDialog(
    //         "epeld",
    //         'Now loading layout...',
    //     );
    // }, 3000);

    // setTimeout(function () {
    //     messageHub.updateLoadingDialog(
    //         "epeld",
    //         'Finally loading views...',
    //     );
    // }, 5000);

    // setTimeout(function () {
    //     messageHub.hideLoadingDialog("epeld");
    // }, 7000);

    // setTimeout(function () {
    //     messageHub.showSelectDialog(
    //         "Select dialog example",
    //         [
    //             { id: "opt1", text: "Option 1" },
    //             { id: "opt2", text: "Option 2" },
    //             { id: "opt3", text: "Option 3" },
    //         ],
    //         "example.selectDialog.test",
    //         false,
    //         true
    //     );
    // }, 2000);

    // setTimeout(function () {
    //     messageHub.showDialogWindow(
    //         "about",
    //         {
    //             param1: 1,
    //             param2: 2,
    //         },
    //         'example.widnow.close',
    //         false
    //     );
    // }, 1000);


    // setTimeout(function () {
    //     messageHub.closeDialogWindow("about");
    // }, 4000);

    // messageHub.onDidReceiveMessage(
    //     'example.widnow.close',
    //     function () {
    //         console.log("Window closed");
    //     },
    //     true
    // );

    // messageHub.onDidReceiveMessage(
    //     "example.dialog.test",
    //     function (data) {
    //         if (data.data === "b1") {
    //             messageHub.setStatusMessage('User clicked on the "Ok" dialog button.');
    //         } else if (data.data === "b2") {
    //             messageHub.setStatusError('User clicked on the "Cancel" dialog button.');
    //         } else {
    //             messageHub.setStatusMessage('You get a message here.');
    //             messageHub.setStatusError('And an error here.');
    //         }
    //     },
    //     true
    // );

    // messageHub.onDidReceiveMessage(
    //     "example.selectDialog.test",
    //     function (data) {
    //         if (!Array.isArray(data.data.selected)) {
    //             messageHub.showAlertInfo(
    //                 "Item selected",
    //                 "Item ID: " + data.data.selected
    //             );
    //         }
    //         else if (data.data.selected.length > 0)
    //             messageHub.showAlertInfo(
    //                 "You have selected the following items",
    //                 data.data.selected.join(', ')
    //             );
    //         else messageHub.showAlertWarning(
    //             "Nothing is selected",
    //             "If you don't select anything, you are not going to get anything."
    //         );
    //     },
    //     true
    // );

    // messageHub.onDidReceiveMessage(
    //     "example.formDialog.test",
    //     function (msg) {
    //         if (msg.data.buttonId === "b1") {
    //             if (msg.data.formData[0].value !== "wrong") {
    //                 setTimeout(function () {
    //                     messageHub.hideFormDialog("testForm1");
    //                 }, 2000);
    //             } else {
    //                 msg.data.formData[0].error = true;
    //                 msg.data.formData[0].errorMsg = "This is an example error.";
    //                 for (let i = 0; i < msg.data.formData[4].items.length; i++) {
    //                     if (msg.data.formData[4].items[i].value === msg.data.formData[4].value) {
    //                         msg.data.formData[4].items[i].error = true;
    //                         console.log(msg.data.formData[4].items);
    //                         break;
    //                     }
    //                 }
    //                 setTimeout(function () {
    //                     messageHub.updateFormDialog(
    //                         "testForm1",
    //                         msg.data.formData,
    //                         "Sending a second time....",
    //                         "There was an error"
    //                     );
    //                 }, 4000);
    //             }
    //         } else {
    //             messageHub.hideFormDialog("testForm1");
    //         }
    //     },
    //     true
    // );

    $scope.contextMenuContent = function (element) {
        return {
            callbackTopic: "example.contextmenu",
            items: [
                {
                    id: "new",
                    label: "New",
                    icon: "sap-icon--create",
                    items: [
                        {
                            id: "tab",
                            label: "Tab"
                        },
                    ]
                },
                {
                    id: "other",
                    label: "Other",
                    divider: true,
                    icon: "sap-icon--question-mark"
                }
            ]
        }
    };

    messageHub.onDidReceiveMessage(
        "contextmenu",
        function (msg) {
            if (msg.data == "other") {
                messageHub.showAlertSuccess(
                    "Success",
                    "You have selected the other option!"
                );
            } else {
                messageHub.showAlertInfo(
                    "Nothing will happen",
                    "This is just a demo after all."
                );
            }
        }
    );

    messageHub.onDidReceiveMessage(
        "example.busy.closed",
        function () {
            messageHub.setStatusMessage('Busy dialog closed by the user.');
        },
        true
    );

    $scope.layoutModel = {
        // Array of view ids
        views: ["example-game", "example-history"],
        viewSettings: {
            "example-game": { isClosable: false },
            "example-history": { isClosable: true },
        },
        layoutSettings: {
            hideEditorsPane: false
        },
        events: {
            "example.alert.info": function (msg) {
                console.info(msg.data.message);
            }
        }
    };
}]);
