define(['jquery', 'underscore', 'backbone', 'text!templates/home/index.html', 'router'], function ($, _, Backbone, template, Router) {

    var IndexView = Backbone.View.extend({

        el: $('article > .container'),

        events: {
            'click #create': 'goCreate'
        },

        render: function () {
            var data = { message: 'Olá mundo!' };
            
            var compilatedTemplate = _.template(template, data);
            this.$el.html(compilatedTemplate);
            
            return this;
        },
        
        goCreate: function (e) {
            e.preventDefault();
            Backbone.history.navigate('criar/conta', { trigger: true });
        }
    });

    return IndexView;
});