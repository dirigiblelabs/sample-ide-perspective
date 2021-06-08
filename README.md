# Guess my number example project

Example project showcasing how to write Eclipse Dirigible modules.

## Components

### Main perspective

The main perspective contains the main IDE view, with the top menu, sidebar, bottom status bar and the main plane view where all the subviews will be placed.

- ide-gmn/gmn.html
- ide-gmn/extensions/gmn-perspective.extension
- ide-gmn/extensions/gmn-menu.extension
- ide-gmn/extensions/menu/*
- ide-gmn/js/gmn-perspective.js
- ide-gmn/services/menu/gmn-menu.js

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