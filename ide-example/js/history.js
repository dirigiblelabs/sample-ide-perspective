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
    $scope.history = [];
    $scope.excludedElements = {
        ids: ["treeSearch"],
        classes: ["fd-input"],
        types: ["INPUT"]
    };
    $scope.data = [
        {
            text: "Project 2",
            type: "gitProject",
            children: [
                {
                    text: "File 4",
                    type: "file"
                },
                {
                    text: "Folder 2",
                    type: "folder",
                    children: [
                        {
                            text: "Folder 10",
                            type: "folder",
                            children: [
                                {
                                    text: "File 6",
                                    type: "file",
                                },
                                {
                                    text: "File 50",
                                    type: "file",
                                },
                            ]
                        },
                        {
                            text: "File 6",
                            type: "file",
                        },
                        {
                            text: "File 5",
                            type: "file",
                        },
                        {
                            text: "Folder 3",
                            type: "folder",
                            children: [
                                {
                                    text: "File",
                                    type: "file",
                                },
                                {
                                    text: "Another File",
                                    type: "file",
                                },
                                {
                                    text: "Yet Another File",
                                    type: "file",
                                },
                            ]
                        }
                    ],
                },
            ],
        },
    ];
    $scope.jstreeWidget = angular.element('#jstree_demo');

    $scope.addNode = function () {
        $scope.jstreeWidget.jstree(true).create_node(
            'j1_4',
            {
                text: "New File",
                state: { added: true },
                type: "file"
            },
            "last"
        );
    };

    let to = false;
    $scope.search = function () {
        if (to) { clearTimeout(to); }
        to = setTimeout(function () {
            $scope.jstreeWidget.jstree(true).search($('#treeSearch').val());
        }, 250);
    }

    $scope.jstreeWidget.jstree({
        core: {
            check_callback: true,
            themes: {
                name: "fiori",
                variant: "compact",
            },
            data: $scope.data,
        },
        plugins: ["wholerow", "dnd", "search", "state", "types", "indicator"],
        // plugins: ["wholerow", "dnd", "search", "state", "types", "indicator", "checkbox"],
        state: { "dgNext": "demo2" },
        types: {
            "default": {
                icon: "sap-icon--question-mark"
            },
            file: {
                icon: "jstree-file"
            },
            folder: {
                icon: "jstree-folder"
            },
            project: {
                icon: "sap-icon--folder"
            },
            gitProject: {
                icon: "jstree-git"
            }
        },
    });

    $scope.contextMenuContent = function (element) {
        if ($scope.jstreeWidget[0].contains(element)) {
            let id;
            if (element.tagName !== "LI") {
                let closest = element.closest("li");
                if (closest) id = closest.id;
                else return {
                    callbackTopic: "example.history.contextmenu",
                    items: [
                        {
                            id: "paste",
                            label: "Paste",
                            shortcut: "Ctrl+V",
                            icon: "sap-icon--paste"
                        },
                    ]
                }
            }
            if (id) {
                let node = $scope.jstreeWidget.jstree(true).get_node(id);
                if (node.type === "gitProject") {
                    return {
                        callbackTopic: "example.history.contextmenu",
                        items: [
                            {
                                id: "rename",
                                label: "Rename",
                                icon: "sap-icon--copy",
                                data: {
                                    nodeId: id
                                }
                            },
                            {
                                id: "copy",
                                label: "Copy",
                                shortcut: "Ctrl+C",
                                divider: true,
                                icon: "sap-icon--copy",
                                data: {
                                    nodeId: id
                                }
                            },
                            {
                                id: "paste",
                                label: "Paste",
                                shortcut: "Ctrl+V",
                                icon: "sap-icon--paste"
                            },
                        ]
                    }
                }
            }
            return;
        } else if (element.tagName === "BUTTON") {
            return;
        }
        return {
            callbackTopic: "example.history.contextmenu",
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

    messageHub.onDidReceiveMessage(
        'example.history.contextmenu',
        function (msg) {
            if (msg.data.itemId === "rename") {
                $scope.jstreeWidget.jstree(true).edit(msg.data.data.nodeId);
                console.log("Rename", msg.data.data.nodeId);
            }
        },
        true
    );

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