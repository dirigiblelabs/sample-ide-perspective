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
var examplePerspective = angular.module('example', ['ngResource', 'ideUiCore']);

examplePerspective.config(["messageHubProvider", function (messageHubProvider) {
    messageHubProvider.evtNamePrefix = 'example';
}]);

// Initialize messageHub
examplePerspective.factory('$messageHub', [function () {
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
examplePerspective.controller('ExampleViewController', ['Layouts', function (Layouts) {
    this.layoutModel = {
        // Array of view ids
        views: ['example-history', 'example-game'],
        viewSettings: {
            'example-history': { isClosable: false },
            'example-game': { isClosable: false },
        },
        layoutSettings: {
            hasHeaders: true,
            showMaximiseIcon: false,
            showCloseIcon: false
        }
    };
}]);