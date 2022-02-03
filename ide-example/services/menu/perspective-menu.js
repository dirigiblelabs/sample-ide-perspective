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
	return {
		"name": "Example",
		"order": "100",
		"items": [
			{
				"name": "Submenu",
				"order": "110",
				"items": [
					{
						"name": "GitHub page",
						"data": "https://github.com/dirigiblelabs/sample-ide-perspective",
						"event": "open",
						"order": "110"
					},
					{
						"name": "Empty item with divider",
						"link": "#",
						"divider": true,
						"order": "120"
					},
					{
						"name": "Empty item",
						"link": "#",
						"order": "130"
					}
				]
			},
			{
				"name": "Submenu",
				"order": "120",
				"items": [
					{
						"name": "GitHub page",
						"data": "https://github.com/dirigiblelabs/sample-ide-perspective",
						"event": "open",
						"order": "110"
					},
					{
						"name": "Empty item with divider",
						"link": "#",
						"divider": true,
						"order": "120"
					},
					{
						"name": "Empty item",
						"order": "130",
						"items": [
							{
								"name": "GitHub page",
								"data": "https://github.com/dirigiblelabs/sample-ide-perspective",
								"event": "open",
								"order": "110"
							},
							{
								"name": "Empty item with divider",
								"link": "#",
								"divider": true,
								"order": "120"
							},
							{
								"name": "Empty item",
								"link": "#",
								"order": "130"
							}
						]
					},
					{
						"name": "Empty item 2",
						"order": "140",
						"items": [
							{
								"name": "GitHub page",
								"data": "https://github.com/dirigiblelabs/sample-ide-perspective",
								"event": "open",
								"order": "110"
							},
							{
								"name": "Empty item with divider",
								"link": "#",
								"divider": true,
								"order": "120"
							},
							{
								"name": "Empty item",
								"link": "#",
								"order": "130"
							}
						]
					}
				]
			},
			{
				"name": "About",
				"link": "#",
				"order": "130"
			}
		]
	};
}