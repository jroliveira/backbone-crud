define([
        'jquery',
        'underscore',
        'backbone'
], function ($, _, Backbone) {

    var Account = Backbone.Model.extend({

        urlRoot: '/api/accounts',
        
        idAttribute: 'id',
        
        initialize: function () {
            this.bind('change', this.storeAction, this);
            this.bind('destroy', this.storeAction, this);
        },
        
        storeAction: function(event) {
            if (this.id) {
                var action = {};
                action.model = this;
                action.type = 'destroy';
                
                if (event._changing) {
                    action.type = 'change';
                    action.undo = function () {
                        var attributes = this.model.previousAttributes();
                        this.model.save(attributes);
                    };
                }
                
                this.trigger('undoableAction', action);            
            }
        },

        defaults: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        
        validate: function (attrs) {
            var errors = [];
            
            if (!attrs.name) {
                errors.push({name: 'name', message: 'Campo obrigatório.'});
            }
            
            var emailPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!emailPattern.test(attrs.email)) {
                errors.push({ name: 'email', message: 'E-mail inválido.' });
            }

            if (!attrs.email) {
                errors.push({ name: 'email', message: 'Campo obrigatório.' });
            }
            
            if (!attrs.password) {
                errors.push({ name: 'password', message: 'Campo obrigatório.' });
            }
            
            if (attrs.password !== attrs.confirmPassword) {
                errors.push({ name: 'confirmPassword', message: 'Senha năo confere.' });
            }

            if (!attrs.confirmPassword) {
                errors.push({ name: 'confirmPassword', message: 'Campo obrigatório.' });
            }
            
            return errors.length > 0 ? errors : false;
        }

    });

    return Account;
});