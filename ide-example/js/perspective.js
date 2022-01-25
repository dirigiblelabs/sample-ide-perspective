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
let examplePerspective = angular.module('example', ['ngResource', 'idePerspective', 'ideUI']);

examplePerspective.config(["messageHubProvider", function (messageHubProvider) {
    messageHubProvider.eventIdPrefix = 'example';
}]);

// Initialize controller
examplePerspective.controller('ExampleViewController', ['$scope', 'messageHub', 'Layouts', function ($scope, messageHub) {
    $scope.message = "Some message";
    $scope.error = "Some error";
    $scope.caret = "Line 79 : Column 80";
    setTimeout(function () {
        messageHub.postMessage(
            "ide.statusMessage",
            "This is good!",
            true
        );
    }, 2000);
    setTimeout(function () {
        messageHub.announceAlertSuccess(
            "Success",
            "This is good!"
        );
    }, 4000);
    // setTimeout(function () {
    //     messageHub.announceAlertInfo(
    //         "Information",
    //         "Some inforamtion."
    //     );
    // }, 5000);
    // setTimeout(function () {
    //     messageHub.announceAlertWarning(
    //         "Warning",
    //         "You be careful!"
    //     );
    // }, 6000);
    setTimeout(function () {
        messageHub.announceAlertError(
            "Error",
            "Something goodn't happened."
        );
    }, 5000);
    this.layoutModel = {
        // Array of view ids
        views: ['example-game', 'example-history'],
        viewSettings: {
            'example-game': { isClosable: false },
            'example-history': { isClosable: true },
        },
        layoutSettings: {
            hasHeaders: true,
            showMaximiseIcon: true,
            showCloseIcon: true
        },
        events: {
            'example.alert.info': function (msg) {
                console.info(msg.data.message);
            }
        }
    };
}]);