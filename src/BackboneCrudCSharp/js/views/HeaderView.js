define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/header.html'
], function ($, _, Backbone, template) {

    var HeaderView = Backbone.View.extend({

        className: 'navbar navbar-inverse navbar-fixed-top',

        events: {
            'click #accounts': 'goAccounts',
            'click #home': 'goHome'
        },

        render: function () {
            this.$el.html(template);
            
            return this;
        },
        
        goAccounts: function (e) {
            e.preventDefault();
            Backbone.history.navigate('contas', { trigger: true });
        },
        
        goHome: function(e) {
            e.preventDefault();
            Backbone.history.navigate('/', { trigger: true });
        }

    });

    return HeaderView;
});