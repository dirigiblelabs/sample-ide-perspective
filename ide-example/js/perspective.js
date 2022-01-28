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
let examplePerspective = angular.module("example", ["ngResource", "idePerspective", "ideUI"]);

examplePerspective.config(["messageHubProvider", function (messageHubProvider) {
    messageHubProvider.eventIdPrefix = 'example';
}]);

// Initialize controller
examplePerspective.controller("ExampleViewController", ["$scope", "messageHub", "Layouts", function ($scope, messageHub) {
    // setTimeout(function () {
    //     messageHub.announceAlertSuccess(
    //         "Success",
    //         "This is good!"
    //     );
    // }, 2000);

    // setTimeout(function () {
    //     messageHub.showDialog(
    //         "Dialog example",
    //         'Clicking "Ok" will result in a statusbar message, while "Cancel" will result in an statusbar error warning.',
    //         "Ok",
    //         "Cancel",
    //         "example.dialog.test"
    //     );
    // }, 2000);

    setTimeout(function () {
        messageHub.showSelectDialog(
            "Select dialog example",
            [{ id: "opt1", text: "Option 1" }, { id: "opt2", text: "Option 2" }, { id: "opt3", text: "Option 3" }],
            "example.selectDialog.test"
        );
    }, 2000);

    messageHub.onDidReceiveMessage(
        "example.dialog.test",
        function (data) {
            if (data.data === "main") {
                messageHub.setStatusMessage('User clicked on the "Ok" dialog button.');
            } else {
                messageHub.setStatusError('User clicked on the "Cancel" dialog button.');
            }
        },
        true
    );

    messageHub.onDidReceiveMessage(
        "example.selectDialog.test",
        function (data) {
            if (data.data.selected.length > 0)
                messageHub.announceAlertInfo(
                    "You have selected the following items",
                    data.data.selected.join(', ')
                );
            else messageHub.announceAlertWarning(
                "Nothing is selected",
                "If you don't select anything, you are not going to get anything."
            );
        },
        true
    );

    this.layoutModel = {
        // Array of view ids
        views: ["example-game", "example-history"],
        viewSettings: {
            "example-game": { isClosable: false },
            "example-history": { isClosable: true },
        },
        layoutSettings: {
            hasHeaders: true,
            showMaximiseIcon: true,
            showCloseIcon: true
        },
        events: {
            "example.alert.info": function (msg) {
                console.info(msg.data.message);
            }
        }
    };
}]);