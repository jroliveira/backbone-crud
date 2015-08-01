require.config({
    paths: {
        jquery: 'libs/jquery/jquery',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        order: 'libs/requirejs-order/order',
        text: 'libs/requirejs-text/text',
        'bootstrap': 'libs/bootstrap/docs/assets/js/bootstrap'
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