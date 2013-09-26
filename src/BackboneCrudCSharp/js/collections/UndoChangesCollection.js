define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var UndoChangesCollection = Backbone.Collection.extend({
        
        initialize: function () {
            this.bind('undoableAction', this.storeLastAction, this);
        },

        storeLastAction: function (event) {
            this.lastAction = event;
            if (event.type === 'destroy') {
                this.lastAction.collection = this;
                this.lastAction.undo = function () {
                    this.collection.create(this.model.attributes, { wait: true });
                    this.collection.lastAction = null;
                };
            }
        }

    });

    return UndoChangesCollection;

});