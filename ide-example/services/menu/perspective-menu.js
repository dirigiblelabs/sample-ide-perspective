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
		label: "Example",
		order: 1,
		items: [
			{
				label: "Submenu",
				order: 1,
				items: [
					{
						label: "GitHub page",
						data: "https://github.com/dirigiblelabs/sample-ide-perspective",
						action: "open",
						order: 1
					},
					{
						label: "Empty item with divider",
						divider: true,
						order: 2
					},
					{
						label: "Empty item",
						order: 3
					}
				]
			},
			{
				label: "Submenu",
				order: 2,
				items: [
					{
						label: "GitHub page",
						data: "https://github.com/dirigiblelabs/sample-ide-perspective",
						action: "open",
						order: 1
					},
					{
						label: "Empty item with divider",
						divider: true,
						order: 2
					},
					{
						label: "Empty item",
						order: 3,
						items: [
							{
								label: "GitHub page",
								data: "https://github.com/dirigiblelabs/sample-ide-perspective",
								action: "open",
								order: 1
							},
							{
								label: "Empty item with divider",
								divider: true,
								order: 2
							},
							{
								label: "Empty item",
								order: 3
							}
						]
					},
					{
						label: "Empty item 2",
						order: 2,
						items: [
							{
								label: "GitHub page",
								data: "https://github.com/dirigiblelabs/sample-ide-perspective",
								action: "open",
								order: 1
							},
							{
								label: "Empty item with divider",
								divider: true,
								order: 2
							},
							{
								label: "Empty item",
								order: 3,
								items: [
									{
										label: "GitHub page",
										data: "https://github.com/dirigiblelabs/sample-ide-perspective",
										action: "open",
										order: 1
									},
									{
										label: "Empty item with divider",
										divider: true,
										order: 2
									},
									{
										label: "Empty item",
										order: 3
									}
								]
							}
						]
					}
				]
			},
			{
				label: "Event",
				order: 3,
				event: "example.menu.event",
				divider: true,
			},
			{
				label: "About",
				action: "openDialogWindow",
				dialogId: "about",
				order: 4
			}
		]
	};
}