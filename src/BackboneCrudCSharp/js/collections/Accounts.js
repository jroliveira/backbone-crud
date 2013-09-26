define([
    'jquery',
    'underscore',
    'backbone',
    'models/Account'
], function ($, _, Backbone, Account) {

    var Accounts = Backbone.Collection.extend({
        
        model: Account,
        
        url: '/api/accounts',
        
        initialize: function () {
            this.bind('undoableAction', this.storeLastAction, this);
        },

        storeLastAction: function (event) {
            this.lastAction = event;
            if (event.type === 'destroy') {
                this.lastAction.collection = this;
                this.lastAction.undo = function () {
                    this.model.unset('id');
                    this.collection.create(this.model.attributes, { wait: true });
                    this.collection.lastAction = null;
                };
            }
        }

    });

    return Accounts;

});