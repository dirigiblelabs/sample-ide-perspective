# Guess my number example project

Example project showcasing how to write Eclipse Dirigible modules.

## Components

### Main perspective

The main perspective contains the main IDE view, top menu, sidebar, bottom status bar and the main plane view where all the subviews will be placed.

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

## Creating Extensions

The extension files are used by Dirigible to know that this project contains Dirigible modules.

1. Perspective extension

```
// ide-gmn/extensions/gmn-perspective.extension

{
    "module": "ide-gmn/services/gmn-perspective-view.js",
    "extensionPoint": "ide-perspective",
    "description": "Guess my number perspective"
}
```

- `module`: Path to the JavaScript file exporting the project perspective.
- `extensionPoint`: Where and how this perspective will be shown. 'ide-perspective' means that it will be opened in its own page and it will not be embedded. Some of the possible values are:

    - ide-perspective
    - ide-view
    - ide-editor
    - ide-database-menu
    - ide-documents-content-type
    - ide-workspace-menu-new-template

The JavaScript service file should look like this:

```
// ide-gmn/services/gmn-perspective-view.js

exports.getPerspective = function () {
	var perspective = {
		"name": "Guess my number",
		"link": "../ide-gmn/gmn-perspective.html",
		"order": "1000",
		"image": "gamepad"
	};
	return perspective;
}
```

- `name`: The name of this perspective
- `link`: Relative link to the main html file which contains the perspective and all subviews.
- `order`: Every perspective should have a button in the WebIDE sidebar which will lead to the perspective view. 'order' is the position of the button in the sidebar. Bigger number equals lower position.
- `image`: Name of the icon from the Font Awesome icon set.

2. View/Subview extension

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
		"region": "main",
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

Same as the perspective extension, except here we specify our own 'extensionPoint', specific to the perspective to which the menu belongs to. In order to create an extension point, we create a '.extensionpoint' file, which looks like this:

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
- `link`: When clicked, the menu could open another page. If this is a top-level menu with submenus, then this item can be omitted from the object or it can link to nothing (#).
- `order`: The position of the menu in the menubar. `1` is the first position, `2` is the second, etc.
- `items`: Submenu items with the same properties.

## Creating Views

1. View

In order to create a view, you must start with a basic html file. All views are created by mainly using the following third-party components:

 - AngularJS
 - jQuery
 - Bootstrap
 - Font Awesome
 - GoldenLayout

Before learning about internal Dirigible components and how to create a view, make sure you have at least a basic understanding of the components listed above.

You will also need some components, developed in-house, specifically for Dirigible.

- MessageHub
- IDE Core UI
- IDE Styles

You can see a full example in `ide-gmn/gmn-game.html` and `ide-gmn/js/gmn-game.js`
All components must be included in the project itself or in Dirigible. Views should *NOT* rely on CDN resources.

2. Perspective View

The perspective is a special kind of view with some components added in.

First difference is that when you create a controller, you *must* also create an alias to it.
This alias will later be used to initialize the layout.

Example:

```
<html ng-app="gmn" ng-controller="GmnViewController as gvc">
...
<div id="gmn" class="plane" views-layout views-layout-model="gvc.layoutModel">
```

```
var gnmPerspective = angular.module('gmn', ['ngResource', 'ideUiCore']);

gnmPerspective.controller('GmnViewController', ['Layouts', function (Layouts) {
    this.layoutModel = {
        // Array of view ids
        views: ['gmn-history', 'gmn-game']
    };
}]);
```

You can look at `ide-gmn/gmn-perspective.html` and `ide-gmn/js/gmn-perspective.js` to see a full example.

## MessageHub

MessageHub is an internal library based on `window.postMessage()`. It's used to trigger events and transfer data between views.

Example:

- Include MessageHub

```
<script src="../../../../services/v4/web/ide-core/ui/message-hub.js"></script>
```

- Initialize MessageHub

```
someView.factory('$messageHub', [function () {
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
```

- Include it along with the scope of the controller

```
gmnGameView.controller('GmnGameViewController', ['$scope', '$messageHub', function ($scope, $messageHub) {
}]);
```

- Trigger an event

```
$messageHub.message('dot.separated.event.name');
```

- Trigger an event with data

```
$messageHub.message('dot.separated.event.name', { hasData: "yes" });
```

- Subscribe and handle events

```
$messageHub.on('dot.separated.event.name', function (msg) {
    if ("hasData" in msg.data) {
        $scope.$apply(function () {
            console.log(msg.data.hasData);
        });
    }
}.bind(this));
```

For a full example, look at the `ide-gmn/js/gmn-game.js` and `ide-gmn/js/gmn-game-screen-*.js` files.