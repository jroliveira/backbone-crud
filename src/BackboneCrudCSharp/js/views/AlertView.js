﻿define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/alert.html'
], function ($, _, Backbone, template) {

    var AlertView = Backbone.View.extend({

        el: $('article > .container'),

        initialize: function () {
            this.type = this.options.type;
            this.message = this.options.message;

            this.$el.find('.alert').remove();
        },

        render: function () {
            var data = { type: this.type, message: this.message };
            var compilatedTemplate = _.template(template, data);
            $(this.el).prepend(compilatedTemplate);

            return this;
        }
    });

    return AlertView;
});