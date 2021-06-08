# Guess my number example project

Example project showcasing how to write Eclipse Dirigible modules.

## Components

### Main perspective

The main perspective contains the main IDE view, with the top menu, sidebar, bottom status bar and the main plane view where all the subviews will be placed.

- ide-gmn/gmn-perspective.html
- ide-gmn/extensions/gmn-perspective.extension
- ide-gmn/extensions/menu/*
- ide-gmn/js/gmn-perspective.js
- ide-gmn/services/menu/*

### Game subview

This subview contains the game itself.

- ide-gmn/gmn-game.html
- ide-gmn/partials/gmn-game-screen-one.html
- ide-gmn/partials/gmn-game-screen-two.html
- ide-gmn/partials/gmn-game-screen-three.html
- ide-gmn/partials/gmn-game-screen-four.html
- ide-gmn/extensions/gmn-game.extension
- ide-gmn/js/gmn-game.js
- ide-gmn/js/gmn-game-screen-one.js
- ide-gmn/js/gmn-game-screen-two.js
- ide-gmn/js/gmn-game-screen-three.js
- ide-gmn/js/gmn-game-screen-four.js
- ide-gmn/services/gmn-game-view.js

### History subview

- ide-gmn/gmn-history.html
- ide-gmn/extensions/gmn-history.extension
- ide-gmn/js/gmn-history.js
- ide-gmn/services/gmn-history-view.js

## Extensions

The extension files are used by Dirigible to know that this project contains Dirigible modules/plugins.

1. Perspective extension

```
// ide-gmn/extensions/gmn-perspective.extension

{
    "module": "ide-gmn/services/gmn-perspective.js",
    "extensionPoint": "ide-perspective",
    "description": "Guess my number perspective"
}
```

- `module`: Path go the JavaScript file exporting the project perspective.
- `extensionPoint`: The place where this perspective will be shown. 'ide-perspective' means that it will be opened in its own page and it will not be embedded. Some of the posssible values are:

    - ide-perspective
    - ide-view
    - ide-editor
    - ide-database-menu
    - ide-documents-content-type
    - ide-workspace-menu-new-template

The JavaScript service file should look like this:

```
// ide-gmn/services/gmn-perspective.js

exports.getPerspective = function () {
	var perspective = {
		"name": "Guess my number",
		"link": "../ide-gmn/gmn-perspective.html", // Link to the section
		"order": "1000", // Used to sort the tabs in the sidebar
		"image": "gamepad" // Font awesome icon name
	};
	return perspective;
}
```

- `name`: The name of this perspective
- `link`: Relative link to the main html file which contains the perspective and all subviews.
- `order`: Every perspective should have a button in the WebIDE sidebar which will lead to the perspective using the link. 'order' is the position of the button in the sidebar. Bigger number means lower position.
- `image`: Name of the icon from the Font Awesome icon set.

2. View/Subview extention

```
// ide-gmn/extensions/gmn-game.extension

{
    "module": "ide-gmn/services/gmn-game-view.js",
    "extensionPoint": "ide-view",
    "description": "Guess my number view"
}
```

Same as the perspective extension.
The JavaScript service file should look like this:

```
// ide-gmn/services/gmn-game-view.js

exports.getView = function () {
	var view = {
		"id": "gmn-game",
		"name": "Guess my number",
		"factory": "frame",
		"region": "center-middle",
		"label": "Guess my number",
		"link": "../ide-gmn/gmn-game.html"
	};
	return view;
}
```

- `id`: The id of the view.
- `name`: The name of the view.
- `factory`: N/A
- `region`: If this is a subview, this tells GoldenLayout where the view should be opened. Possible options are:

    - main
    - left
    - left-top
    - left-middle
    - left-bottom
    - center
    - center-top
    - center-middle
    - center-bottom
    - right
    - right-top
    - right-middle
    - right-bottom

- `label`: Text for the tab when the view is in a GoldenLayout frame.
- `link`: Relative link to the main html file of the view.

3. Menu extension

```
// ide-gmn/extensions/menu/gmn-menu.extension

{
    "module": "ide-gmn/services/menu/gmn-menu.js",
    "extensionPoint": "ide-gmn-menu",
    "description": "Guess my number first menu"
}
```

Same as the perspective extension, except here we specify our own 'extensionPoint', specific to the perspective to which the menu belogs to. In order to create an extension point, we create a '.extensionpoint' file, which looks like this:

```
// ide-gmn/extensions/menu/menu.extensionpoint

{
    "name": "ide-gmn-menu",
    "description": "Extension Point for the Guess my number Menu"
}
```

The JavaScript that will initialize the menu and its extension point should look like this:

```
// ide-gmn/services/menu/menu.js

let extensions = require('core/v4/extensions');
let response = require('http/v4/response');

let mainmenu = [];
let menuExtensions = extensions.getExtensions('ide-gmn-menu');
for (let i = 0; i < menuExtensions.length; i++) {
    let module = menuExtensions[i];
    let menuExtension = require(module);
    let menu = menuExtension.getMenu();
    mainmenu.push(menu);
}
mainmenu.sort(function (p, n) {
    return (parseInt(p.order) - parseInt(n.order));
});
response.println(JSON.stringify(mainmenu));
```

The JavaScript menu file should look like this:

```
// ide-gmn/services/menu/gmn-menu.js

exports.getMenu = function () {
	var menu = {
		"name": "GMN",
		"link": "#",
		"order": "100",
		"items": [
			{
				"name": "GitHub page",
				"link": "https://github.com/StanZGenchev/ide-gmn.git",
				"order": "110"
			}
		]
	};
	return menu;
}
```

- `name`: The name of the menu item.
- `link`: When clicked, the menu could lead to another page. If this is a top-level menu with submenus, then this item can be omitted from the object or it can link to notheing (#).
- `order`: The position of the menu in the menubar. `1` is the first position, `2` is the second, etc.
- `items`: Submenu items with the same properties.