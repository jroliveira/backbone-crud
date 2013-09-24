define([
        'jquery',
        'underscore',
        'backbone'
], function ($, _, Backbone) {

    var Account = Backbone.Model.extend({

        urlRoot: '/api/accounts',
        
        idAttribute: 'id',
        
        initialize: function () {
            var me = this;
            
            this.on("invalid", function (model, error) {
                me.showErrors(error);
            });
            
            this.on("change", function () {
                me.hideErrors();
            });
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
        },
        
        showErrors: function (errors) {
            _.each(errors, function (error) {
                var $controlGroup = $('#' + error.name).closest('.control-group');
                $controlGroup.addClass('error');
                $controlGroup.find('.help-inline').text(error.message);
            }, this);
        },

        hideErrors: function () {
            $('.control-group').removeClass('error');
            $('.help-inline').text('');
        },

    });

    return Account;
});