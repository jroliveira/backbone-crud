define([
    'jquery',
    'underscore',
    'backbone',
    'models/Account'
], function ($, _, Backbone, Account) {

    var Accounts = Backbone.Collection.extend({
        
        model: Account,
        
        url: '/api/accounts'

    });

    return Accounts;

});