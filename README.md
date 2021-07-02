# Example project

Example project, showing how to write Dirigible perspectives and views.

## Components

### Main perspective

The main perspective contains the main IDE view, top menu, sidebar, bottom status bar and the main plane view where all the subviews will be placed.

- ide-example/perspective.html
- ide-example/extensions/perspective.extension
- ide-example/extensions/menu/\*
- ide-example/js/perspective.js
- ide-example/services/menu/\*

### Game subview

This subview contains the game itself.

- ide-example/game.html
- ide-example/partials/game-screen-one.html
- ide-example/partials/game-screen-two.html
- ide-example/partials/game-screen-three.html
- ide-example/partials/game-screen-four.html
- ide-example/extensions/game.extension
- ide-example/js/game.js
- ide-example/js/game-screen-one.js
- ide-example/js/game-screen-two.js
- ide-example/js/game-screen-three.js
- ide-example/js/game-screen-four.js
- ide-example/services/game-view.js

### History subview

- ide-example/history.html
- ide-example/extensions/history.extension
- ide-example/js/history.js
- ide-example/services/history-view.js

## Creating Extensions

The extension files are used by Dirigible to know that this project contains Dirigible modules.

1. Perspective extension

```json
// ide-example/extensions/perspective.extension

{
  "module": "ide-example/services/perspective-view.js",
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

```javascript
// ide-example/services/perspective-view.js

exports.getPerspective = function () {
  var perspective = {
    name: "Guess my number",
    link: "../ide-example/perspective.html",
    order: "1000",
    image: "gamepad",
  };
  return perspective;
};
```

- `name`: The name of this perspective
- `link`: Relative link to the main html file which contains the perspective and all subviews.
- `order`: Every perspective should have a button in the WebIDE sidebar which will lead to the perspective view. 'order' is the position of the button in the sidebar. Bigger number equals lower position.
- `image`: Name of the icon from the Font Awesome icon set.

2. View/Subview extension

```json
// ide-example/extensions/game.extension

{
  "module": "ide-example/services/game-view.js",
  "extensionPoint": "ide-view",
  "description": "Guess my number view"
}
```

Same as the perspective extension.
The JavaScript service file should look like this:

```javascript
// ide-example/services/game-view.js

exports.getView = function () {
  var view = {
    id: "example-game",
    name: "Guess my number",
    factory: "frame",
    region: "main",
    label: "Guess my number",
    link: "../ide-example/game.html",
  };
  return view;
};
```

- `id`: The unique id of the view.
- `name`: The name of the view.
- `factory`: The type of the factory used during instantiating the view.
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

```json
// ide-example/extensions/menu/menu.extension

{
  "module": "ide-example/services/menu/menu.js",
  "extensionPoint": "ide-example-menu",
  "description": "Guess my number first menu"
}
```

Same as the perspective extension, except here we specify our own 'extensionPoint', specific to the perspective to which the menu belongs to. In order to create an extension point, we create a '.extensionpoint' file, which looks like this:

```javascript
// ide-example/extensions/menu/menu.extensionpoint

{
    "name": "ide-example-menu",
    "description": "Extension Point for the Guess my number Menu"
}
```

The JavaScript that will initialize the menu and its extension point should look like this:

```javascript
// ide-example/services/menu/menu.js

let extensions = require("core/v4/extensions");
let response = require("http/v4/response");

let mainmenu = [];
let menuExtensions = extensions.getExtensions("ide-example-menu");
for (let i = 0; i < menuExtensions.length; i++) {
  let module = menuExtensions[i];
  let menuExtension = require(module);
  let menu = menuExtension.getMenu();
  mainmenu.push(menu);
}
mainmenu.sort(function (p, n) {
  return parseInt(p.order) - parseInt(n.order);
});
response.println(JSON.stringify(mainmenu));
```

The JavaScript menu file should look like this:

```javascript
// ide-example/services/menu/example-menu.js

exports.getMenu = function () {
  var menu = {
    name: "Example",
    link: "#",
    order: "100",
    items: [
      {
        name: "GitHub page",
        link: "https://github.com/dirigiblelabs/sample-ide-perspective",
        order: "110",
      },
    ],
  };
  return menu;
};
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

You can see a full example in `ide-example/game.html` and `ide-example/js/game.js`
All components must be included in the project itself or in Dirigible. Views should _NOT_ rely on CDN resources.

2. Perspective View

The perspective is a special kind of view with some components added in.

First difference is that when you create a controller, you _must_ also create an alias to it.
This alias will later be used to initialize the layout.

Example:

```html
<html ng-app="example" ng-controller="ExampleViewController as evc">
  ...
  <div
    id="example"
    class="plane"
    views-layout
    views-layout-model="evc.layoutModel"
  ></div>
</html>
```

```javascript
var examplePerspective = angular.module("example", ["ngResource", "ideUiCore"]);

examplePerspective.controller("ExampleViewController", [
  "Layouts",
  function (Layouts) {
    this.layoutModel = {
      // Array of view ids
      views: ["example-history", "example-game"],
    };
  },
]);
```

You can add more options to the layout model like events, per view settings, and main layout settings. For more information, see [Layout events](#layout-events) and [Layout settings](#layout-settings).

You can look at `ide-example/perspective.html` and `ide-example/js/perspective.js` files, to see a full example.

## Layout settings

Dirigible makes use of GoldenLayout in order to have multiple, rearrangeable views on one page.
You do not interact with GoldenLayout directly, however some of the options are exposed through the layout model object.

1. `layoutSettings`

This option directly maps to the `settings` object in the GoldenLayout configuration object. You can hide tabs, constrain the area in which items can be dragged, disable rearrangeable views, show or hide the layout popout, maximize and close buttons, etc.
For more information, see the [official documentation](http://golden-layout.com/docs/Config.html).

Example of a layout with tabs enabled and close and maximize buttons disabled:

```javascript
this.layoutModel = {
  views: ["example-history", "example-game"],
  layoutSettings: {
    hasHeaders: true,
    showMaximiseIcon: false,
    showCloseIcon: false,
  },
};
```

2. `viewSettings`

This option directly maps to the `General` section of the `content` object list in GoldenLayut. You can hide the close button on a particular tab/view, set a tab to be active by default, etc. You however cannot change the id or title.
For more information, see the [official documentation](http://golden-layout.com/docs/ItemConfig.html).

Example of two tabs/views, whose close buttons are disabled:

```javascript
this.layoutModel = {
  views: ["example-history", "example-game"],
  viewSettings: {
    "example-history": { isClosable: false },
    "example-game": { isClosable: false },
  },
};
```

## MessageHub

MessageHub is an internal library based on `window.postMessage()`. It's used to trigger events and transfer data between views.
It uses the publish–subscribe pattern. The publisher can also be a subscriber and vice-versa.
One topic can have multiple publishers and subscribers.

Example:

- Include MessageHub

```html
<script src="../../../../services/v4/web/ide-core/ui/message-hub.js"></script>
```

- Initialize MessageHub

There are two main functions in MessageHub:

- `post` - Used for publishing to a topic.
- `subscribe` - Used for subscribing to a topic.

When we "initialize" MessageHub we are actually creating helper functions.
We can create event-specific functions that use the `post` and `subscribe` functions underneath like this:

```javascript
someView.factory("$messageHub", [
  function () {
    var messageHub = new FramesMessageHub();
    var message = function (evtName, data) {
      messageHub.post({ data: data }, evtName);
    };
    var on = function (topic, callback) {
      messageHub.subscribe(callback, topic);
    };
    return {
      message: message,
      on: on,
    };
  },
]);
```

- Include it along with the scope of the controller

```javascript
gameView.controller("GameViewController", [
  "$scope",
  "$messageHub",
  function ($scope, $messageHub) {},
]);
```

- Trigger an event

```javascript
$messageHub.message("dot.separated.event.name");
```

`dot.separated.event.name` is the topic ID. The message is broadcasted and only those subscribed to this topic ID will react to the event.

- Trigger an event with data

```javascript
let msg = { hasData: "yes" };
$messageHub.message("dot.separated.event.name", msg);
```

You can include a second parameter for sending additional data to the subscriber.

- Subscribe and handle events

```javascript
$messageHub.on(
  "dot.separated.event.name",
  function (msg) {
    if ("hasData" in msg.data) {
      $scope.$apply(function () {
        console.log(msg.data.hasData);
      });
    }
  }.bind(this)
);
```

For a full example, look at the `ide-example/js/game.js` and `ide-example/js/game-screen-*.js` files.

## Layout Events

Layout events are based on the functionality provided by MessageHub and are specific to perspectives.
As the name suggests, they are designed for layout-specific events but you can technically use them for any event.

Example:

```javascript
this.layoutModel = {
  // Array of view ids
  views: ["example-game", "example-history"],
  events: {
    "example.alert.info": function (msg) {
      console.info(msg.data.message);
    },
  },
};
```

`example.alert.info` is the topic id. This will make the perspective controller, subscribe to this topic.

## Alert dialogs

In order to take advantage of Dirigible's built-in alert dialogs, you need to include this in the body of your perspective:

```html
<div alert></div>
```

After that, you can trigger an alert by publishing to the `ide.alert` topic.

Using MessageHub directly:

```javascript
messageHub.post(
  {
    data: {
      title: title,
      message: message,
      type: type,
    },
  },
  "ide.alert"
);
```

Or using our helper functions:

```javascript
$messageHub.message(
    'ide.alert',
    data: {
        title: "Title",
        message: "Message",
        type: "success"
    }
);
```

For `type` you have four options:

- "success"
- "info"
- "warning"
- "error"

You can look at `ide-example/perspective.html` and `ide-example/js/history.js` files, to see a full example.
