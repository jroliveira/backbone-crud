define([
    'jquery',
    'underscore',
    'backbone',
    'views/ConfirmView',
    'text!templates/account/item.html',
    'text!templates/undochanges.html'
], function ($, _, Backbone, ConfirmView, template, templateUndoChanges) {

    var ItemView = Backbone.View.extend({

        tagName: "tr",
        
        initialize: function() {
            this.model.on('destroy', this.remove, this);
            this.model.bind('undoableAction', this.showUndo, this);
        },

        events: {
            'click #destroy': 'destroy',
            'click #goEdit': 'goEdit'
        },

        render: function () {
            var data = this.model.toJSON();

            var compilatedTemplate = _.template(template, data);
            $(this.el).append(compilatedTemplate);

            return this;
        },
        
        destroy: function (e) {
            e.preventDefault();

            var view = new ConfirmView({ model: this.model, el: this.el });
            view.render();
        },
        
        goEdit: function (e) {
            e.preventDefault();
            Backbone.history.navigate('conta/editar/' + this.model.get('id'), { trigger: true });
        },
        
        showUndo: function () {
            var $container = $('article > .container');
            $container.prepend(templateUndoChanges);
        }
        
    });

    return ItemView;
});