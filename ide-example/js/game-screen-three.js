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
gameView.controller('GameScreenThree', ['$scope', '$messageHub', function ($scope, $messageHub) {
    $scope.isVisible = false;
    $scope.numberGroups;

    $scope.selectedGroup = function (group) {
        $scope.isVisible = false;
        $messageHub.message('example.game.screeen.four', { isVisible: true, numbers: group });
    };

    $messageHub.on('example.game.screeen.three', function (msg) {
        if ("isVisible" in msg.data) {
            $messageHub.message('example.game.screeen.one', { controller: "example.game.screeen.three", get: "numberGroups" });
            $scope.$apply(function () {
                $scope.isVisible = msg.data.isVisible;
            });
        }
        if ("numberGroups" in msg.data) {
            $scope.numberGroups = msg.data.numberGroups;
            $scope.$apply();
        }
    }.bind(this));
}]);