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
gnmView.controller('secondController', ['$scope', '$messageHub', function ($scope, $messageHub) {
    $scope.isVisible = false;
    $scope.firstNum = 0;
    $scope.secondNum = 99;

    $scope.nextScreen = function () {
        $scope.isVisible = false;
        $messageHub.message('gtn.controller.third', { isVisible: true });
    };

    $messageHub.on('gtn.controller.second', function (msg) {
        if ("isVisible" in msg.data) {
            $scope.$apply(function () {
                $scope.isVisible = msg.data.isVisible;
                $scope.firstNum = 0;
                $scope.secondNum = 99;
            });
        }
    }.bind(this));
}]);