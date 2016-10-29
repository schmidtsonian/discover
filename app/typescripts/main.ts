/// <reference path="definitions/jquery/jquery.d.ts" />

/// <reference path="App.ts" />

import App = amex.App;

let app: App;

$( 'document' )
.ready( () => {

    app = new App();

    app.start();
});