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

        initialize: function () {
            this.collection.on("change reset add remove", this.renderItems, this);
        },

        events: {
            'click #create': 'goCreate',
            'click #undo': 'undoAction'
        },

        render: function() {
            $(this.el).html(template);
            this.renderItems();

            return this;
        },
        
        renderItems: function() {
            var $container = $(this.el).find('table > tbody');
            $container.empty();

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
        },

        goCreate: function(e) {
            e.preventDefault();
            Backbone.history.navigate('conta/criar', { trigger: true });
        },
        
        undoAction: function (e) {
            e.preventDefault();
            
            var action = this.collection.lastAction;
            action.undo();
            $('#undo').hide();
        }

    });

    return IndexView;
});