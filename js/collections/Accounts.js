define([
    'jquery',
    'underscore',
    'backbone',
    'collections/UndoChangesCollection',
    'models/Account'
], function ($, _, Backbone, UndoChangesCollection, Account) {

    var Accounts = UndoChangesCollection.extend({
        
        model: Account,
        
        url: 'http://backbone-crud-csharp.apphb.com/api/accounts',
        
        comparator: function(model){
            return model.get('name');
        }

    });

    return Accounts;

});