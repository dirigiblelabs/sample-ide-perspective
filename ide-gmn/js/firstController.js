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
gnmView.controller('firstController', ['$scope', '$messageHub', function ($scope, $messageHub) {
    let selectedNumberColor = "";
    $scope.isVisible = true;
    $scope.colors = ["blue", "red", "green", "orange", "black", "purple"]

    $scope.numberGroups = {
        first: [
            [96, $scope.colors[3]],
            [2, $scope.colors[2]],
            [14, $scope.colors[0]],
            [4, $scope.colors[1]],
            [33, $scope.colors[4]],
            [28, $scope.colors[5]],
        ],
        second: [
            [81, $scope.colors[5]],
            [78, $scope.colors[0]],
            [54, $scope.colors[4]],
            [23, $scope.colors[1]],
            [9, $scope.colors[2]],
            [13, $scope.colors[3]]
        ],
        third: [
            [1, $scope.colors[1]],
            [17, $scope.colors[0]],
            [59, $scope.colors[3]],
            [21, $scope.colors[2]],
            [55, $scope.colors[5]],
            [6, $scope.colors[4]]
        ],
        forth: [
            [3, $scope.colors[5]],
            [10, $scope.colors[2]],
            [68, $scope.colors[0]],
            [98, $scope.colors[3]],
            [43, $scope.colors[4]],
            [12, $scope.colors[1]]
        ],
        fifth: [
            [20, $scope.colors[3]],
            [11, $scope.colors[4]],
            [71, $scope.colors[2]],
            [39, $scope.colors[1]],
            [8, $scope.colors[0]],
            [40, $scope.colors[5]]
        ],
        sixth: [
            [88, $scope.colors[4]],
            [5, $scope.colors[3]],
            [19, $scope.colors[2]],
            [64, $scope.colors[5]],
            [77, $scope.colors[1]],
            [47, $scope.colors[0]]
        ]
    };

    $scope.setColor = function (color) {
        selectedNumberColor = color;
        $scope.isVisible = false;
        $messageHub.message('gtn.controller.second', { isVisible: true });
    };

    $messageHub.on('gtn.controller.first', function (msg) {
        if ("isVisible" in msg.data) {
            $scope.$apply(function () {
                $scope.isVisible = msg.data.isVisible;
            });
        }
        if ("get" in msg.data) {
            if (msg.data.get === "selectedColor") {
                $messageHub.message(msg.data.controller, { selectedColor: selectedNumberColor });
            }
            else if (msg.data.get === "numberGroups") {
                $messageHub.message(msg.data.controller, { numberGroups: $scope.numberGroups });
            }
        }
    }.bind(this));
}]);