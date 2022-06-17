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
let gameView = angular.module('game', ['ideUI', 'ideView']);

gameView.config(["messageHubProvider", function (messageHubProvider) {
    messageHubProvider.eventIdPrefix = 'example';
}]);

// Initialize controller
gameView.controller('GameViewController', ['$scope', 'messageHub', function ($scope, messageHub) {

    $scope.btnText = "State button";
    $scope.btnType = "positive";
    $scope.btnState = "disabled-focusable";

    $scope.splitButtonAction = "Default";
    $scope.segmentedModel = "middle";
    $scope.fdCheckboxModel = true;
    $scope.fdRadioModel = false;
    $scope.tristate = false;
    $scope.fdListItem = { checkboxModel: true };
    $scope.objectStatusIndicator = 8;

    $scope.selectSelectedValue = 2;

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.totalItems = 100;
    $scope.tableWithPaginationItems = [];
    for (let i = 0; i < $scope.totalItems; i++) {
        $scope.tableWithPaginationItems.push({
            product: `Item ${i + 1}`,
            price: '$' + (Math.random() * 100).toFixed(2),
            amount: Math.floor(Math.random() * 1000)
        });
    }

    $scope.comboboxItems = [
        { value: 1, text: 'Apple' },
        { value: 2, text: 'Pineapple' },
        { value: 3, text: 'Banana' },
        { value: 4, text: 'Kiwi' },
        { value: 5, text: 'Strawberry' }
    ];

    $scope.comboboxItems2 = [
        { value: 1, text: 'Product 1', secondaryText: '1000 EUR' },
        { value: 2, text: 'Product 2', secondaryText: '750 EUR' },
        { value: 3, text: 'Product 3', secondaryText: '780 EUR' },
        { value: 4, text: 'Product 4', secondaryText: '40 EUR' }
    ];

    $scope.setTristate = function () {
        $scope.tristate = true;
    };

    $scope.splitItemClick = function (selected) {
        $scope.splitButtonAction = selected;
    };

    $scope.splitButtonClick = function () {
        messageHub.announceAlertInfo(
            "Split button clicked",
            'You have clicked on the main action button.'
        );
    };

    $scope.popoverItemClick = function () {
        messageHub.announceAlertInfo(
            "Popover item selected",
            'You have selected a popover item.'
        );
    }

    $scope.segmentedClick = function (item) {
        $scope.segmentedModel = item;
    };

    $scope.contextMenuContent = function (element) {
        return {
            callbackTopic: "example.game.contextmenu",
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
                    id: "new1",
                    label: "New",
                    icon: "sap-icon--create",
                    items: [
                        {
                            id: "file1",
                            label: "File",
                            icon: "sap-icon--document"
                        },
                        {
                            id: "folder1",
                            label: "Folder",
                            icon: "sap-icon--folder-blank",
                            items: [
                                {
                                    id: "file2",
                                    label: "File",
                                    icon: "sap-icon--document"
                                },
                                {
                                    id: "folder2",
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

    $scope.test = function () {
        $scope.btnText = "test";
        $scope.btnType = "attention";
    };

    $scope.state = function () {
        if ($scope.btnState === "disabled-focusable")
            $scope.btnState = 'selected';
        else if ($scope.btnState === "selected")
            $scope.btnState = '';
        else $scope.btnState = "disabled-focusable";
    };

    $scope.steps = [
        { id: 1, name: "Choose a number", topicId: "example.game.screeen.one" },
        { id: 2, name: "Enter random numbers", topicId: "example.game.screeen.two" },
        { id: 3, name: "Select magic box", topicId: "example.game.screeen.three" },
        { id: 4, name: "Finish game", topicId: "example.game.screeen.four" },
    ];
    $scope.currentStep = $scope.steps[0];

    messageHub.onDidReceiveMessage(
        "game.contextmenu",
        function (msg) {
            messageHub.announceAlertInfo(
                "Context menu item selected",
                `You have selected a menu item with the following id - ${msg.data}`
            );
        }
    );

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

gameView.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});