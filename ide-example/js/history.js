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
let historyView = angular.module('history', []);

historyView.factory('$messageHub', [function () {
    let messageHub = new FramesMessageHub();
    let announceAlert = function (title, message, type) {
        messageHub.post({
            data: {
                title: title,
                message: message,
                type: type
            }
        }, 'ide.alert');
    };
    let announceAlertSuccess = function (title, message) {
        announceAlert(title, message, "success");
    };
    let announceAlertInfo = function (title, message) {
        announceAlert(title, message, "info");
    };
    let announceAlertWarning = function (title, message) {
        announceAlert(title, message, "warning");
    };
    let announceAlertError = function (title, message) {
        announceAlert(title, message, "error");
    };
    let message = function (evtName, data) {
        messageHub.post({ data: data }, evtName);
    };
    let on = function (topic, callback) {
        messageHub.subscribe(callback, topic);
    };
    return {
        announceAlert: announceAlert,
        announceAlertSuccess: announceAlertSuccess,
        announceAlertInfo: announceAlertInfo,
        announceAlertWarning: announceAlertWarning,
        announceAlertError: announceAlertError,
        message: message,
        on: on
    };
}]);

historyView.controller('HistoryViewController', ['$scope', '$messageHub', function ($scope, $messageHub) {
    $scope.history = []
    $messageHub.on('example.history', function (msg) {
        if ("addNumber" in msg.data) {
            $scope.$apply(function () {
                $scope.history.push(msg.data.addNumber);
                if ($scope.history.length == 1) {
                    $messageHub.announceAlertSuccess(
                        "Congratulations",
                        "You have finished your first game."
                    );
                    $messageHub.message('example.alert.info', {
                        message: "You have finished your first game."
                    });
                }
            });
        }
    }.bind(this));
}]);