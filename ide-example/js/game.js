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
var gameView = angular.module('game', []);

// Initialize messageHub
gameView.factory('$messageHub', [function () {
    var messageHub = new FramesMessageHub();
    var message = function (evtName, data) {
        messageHub.post({ data: data }, evtName);
    };
    var on = function (topic, callback) {
        messageHub.subscribe(callback, topic);
    };
    return {
        message: message,
        on: on
    };
}]);

// Initialize controller
gameView.controller('GameViewController', ['$scope', function ($scope) {
    $scope.steps = [
        { id: 1, name: "Choose a number", topicId: "example.game.screeen.one" },
        { id: 2, name: "Enter random numbers", topicId: "example.game.screeen.two" },
        { id: 3, name: "Select magic box", topicId: "example.game.screeen.three" },
        { id: 4, name: "Finish game", topicId: "example.game.screeen.four" },
    ];
    $scope.currentStep = $scope.steps[0];

    $scope.setStep = function (topicId) {
        for (let i = 0; i < $scope.steps.length; i++) {
            if ($scope.steps[i].topicId === topicId) {
                $scope.currentStep = $scope.steps[i];
                break;
            }
        };
    }

    $scope.isStepActive = function (stepId) {
        if (stepId == $scope.currentStep.id)
            return "active";
        else if (stepId < $scope.currentStep.id)
            return "done";
        else
            return "inactive";
    }
}]);