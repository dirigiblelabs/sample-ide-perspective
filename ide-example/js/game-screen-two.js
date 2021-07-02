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
gameView.controller('GameScreenTwo', ['$scope', '$messageHub', function ($scope, $messageHub) {
    let controllerTopicId = 'example.game.screeen.two';
    $scope.isVisible = false;
    $scope.firstNum = 0;
    $scope.secondNum = 99;

    $scope.nextScreen = function () {
        $scope.isVisible = false;
        $messageHub.message('example.game.screeen.three', { isVisible: true });
    };

    $messageHub.on(controllerTopicId, function (msg) {
        if ("isVisible" in msg.data) {
            if (msg.data.isVisible) {
                $scope.firstNum = 0;
                $scope.secondNum = 99;
                $scope.$parent.setStep(controllerTopicId);
            }
            $scope.$apply(function () {
                $scope.isVisible = msg.data.isVisible;
            });
        }
    }.bind(this));
}]);