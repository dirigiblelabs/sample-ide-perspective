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
let historyView = angular.module('history', ['ideUI']);

historyView.controller('HistoryViewController', ['$scope', 'messageHub', function ($scope, messageHub) {
    $scope.history = []
    messageHub.onDidReceiveMessage(
        'example.history',
        function (msg) {
            if ("addNumber" in msg.data) {
                $scope.$apply(function () {
                    $scope.history.push(msg.data.addNumber);
                    if ($scope.history.length == 1) {
                        messageHub.announceAlertSuccess(
                            "Congratulations",
                            "You have finished your first game."
                        );
                        messageHub.postMessage(
                            'example.alert.info',
                            {
                                message: "You have finished your first game.",
                            },
                            true
                        );
                    }
                });
            }
        },
        true
    );
}]);