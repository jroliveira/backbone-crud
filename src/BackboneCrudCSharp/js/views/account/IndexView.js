define([
    'jquery',
    'underscore',
    'backbone',
    'collections/Accounts',
    'views/account/ItemView',
    'text!templates/account/index.html',
    'text!templates/empty.html'
], function ($, _, Backbone, Accounts, ItemView, template, templateEmpty) {

    var IndexView = Backbone.View.extend({
        
        el: $('article > .container'),

        events: {
            'click #create': 'goCreate'
        },

        render: function() {
            $(this.el).html(template);
            
            var $container = $(this.el).find('table > tbody');

            if (this.collection.models.length < 1) {
                $container.html(templateEmpty);
            } else {
                var me = this;

                $container.empty();
                this.collection.forEach(function (item) {
                    var view = new ItemView({ collection: me.collection, model: item });

                    var content = view.render();
                    $container.append(content.el);
                });
            }

            return this;
        },

        goCreate: function(e) {
            e.preventDefault();
            Backbone.history.navigate('conta/criar', { trigger: true });
        }

    });

    return IndexView;
});