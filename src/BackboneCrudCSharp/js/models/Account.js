define([
        'jquery',
        'underscore',
        'backbone',
        'models/UndoChangesModel'
], function ($, _, Backbone, UndoChangesModel) {

    var Account = UndoChangesModel.extend({

        urlRoot: '/api/accounts',
        
        idAttribute: 'id',
        
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