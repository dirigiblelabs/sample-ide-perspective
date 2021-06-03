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
exports.getMenu = function () {
	var menu = {
		"name": "GMN",
		"link": "#",
		"order": "100",
		"onClick": "",
		"items": [
			{
				"name": "GitHub page",
				"link": "https://github.com/StanZGenchev/ide-gmn.git",
				"order": "110",
				"onClick": ""
			},
			{
				"name": "About",
				"link": "#",
				"order": "120",
				"onClick": ""
			}
		]
	};
	return menu;
}