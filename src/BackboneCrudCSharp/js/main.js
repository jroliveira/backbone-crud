require.config({
    paths: {
        jquery: 'libs/jquery/jquery',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        order: 'libs/require/order',
        text: 'libs/require/text',
        'bootstrap': 'libs/bootstrap/bootstrap'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        'bootstrap': {
            deps: ["jquery"]
        },
    }
});

require(['app'], function (App) {
    App.initialize();
});