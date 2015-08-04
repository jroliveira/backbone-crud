require.config({
    paths: {
        jquery: '../vendor/js/jquery',
        underscore: '../vendor/js/underscore',
        backbone: '../vendor/js/backbone',
        order: 'libs/requirejs-order/order',
        text: '../vendor/js/text',
        'bootstrap': '../vendor/js/bootstrap'
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