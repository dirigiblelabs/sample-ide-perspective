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
gameView.controller('GameScreenFour', ['$scope', '$messageHub', function ($scope, $messageHub) {
    let controllerTopicId = 'example.game.screeen.four';
    $scope.finishedGame = false;
    $scope.btnFirstText = "??";
    $scope.btnSecondText = "??";
    $scope.btnThirdText = "??";
    $scope.numbers;
    $scope.number;
    $scope.isVisible = false;

    $scope.revealNumber = function (btn) {
        switch (btn) {
            case "btnFirst":
                $scope.btnFirstText = $scope.number;
                break;
            case "btnSecond":
                $scope.btnSecondText = $scope.number;
                break;
            case "btnThird":
                $scope.btnThirdText = $scope.number;
                break;
            default:
                console.log("Should not be here...");
        }
        $scope.finishedGame = true;
        $messageHub.message('example.history', { addNumber: $scope.number });
    };

    $scope.playAgain = function () {
        $scope.isVisible = false;
        $messageHub.message('example.game.screeen.one', { isVisible: true });
    };

    $messageHub.on(controllerTopicId, function (msg) {
        if ("isVisible" in msg.data) {
            if (msg.data.isVisible) {
                $scope.finishedGame = false;
                $scope.btnFirstText = "??";
                $scope.btnSecondText = "??";
                $scope.btnThirdText = "??";
                $scope.$parent.setStep(controllerTopicId);
            }
            $scope.$apply(function () {
                $scope.isVisible = msg.data.isVisible;
            });
        }
        if ("numbers" in msg.data) {
            $scope.numbers = msg.data.numbers;
            $messageHub.message('example.game.screeen.one', { controller: "example.game.screeen.four", get: "selectedColor" });
        }
        if ("selectedColor" in msg.data) {
            $scope.numbers.forEach(element => {
                if (element[1] == msg.data.selectedColor) {
                    $scope.number = element[0];
                }
            });
        }
    }.bind(this));
}]);