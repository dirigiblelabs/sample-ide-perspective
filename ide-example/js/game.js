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
let gameView = angular.module('game', ['ideUI']);

// Initialize controller
gameView.controller('GameViewController', ['$scope', function ($scope) {

    $scope.contextMenuContent = function (element) {
        return {
            topic: "example.game.contextmenu",
            items: [
                {
                    id: "new",
                    label: "New",
                    icon: "sap-icon--create",
                    items: [
                        {
                            id: "file",
                            label: "File",
                            icon: "sap-icon--document"
                        },
                        {
                            id: "folder",
                            label: "Folder",
                            icon: "sap-icon--folder-blank",
                            items: [
                                {
                                    id: "file1",
                                    label: "File",
                                    icon: "sap-icon--document"
                                },
                                {
                                    id: "folder1",
                                    label: "Folder",
                                    icon: "sap-icon--folder-blank"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: "copy",
                    label: "Copy",
                    shortcut: "Ctrl+C",
                    divider: true,
                    icon: "sap-icon--copy"
                },
                {
                    id: "paste",
                    label: "Paste",
                    shortcut: "Ctrl+V",
                    icon: "sap-icon--paste"
                },
                {
                    id: "other",
                    label: "Other",
                    divider: true,
                    icon: "sap-icon--question-mark"
                }
            ]
        }
    };

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