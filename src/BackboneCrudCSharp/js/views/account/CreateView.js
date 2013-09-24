define([
    'jquery',
    'underscore',
    'backbone',
    'views/AlertView',
    'text!templates/account/create.html',
    'bootstrap'
], function ($, _, Backbone, AlertView, template) {

    var CreateView = Backbone.View.extend({

        el: $('article > .container'),
        
        events: {
            'click #back': 'goBack',
            'click #submit': 'submit',
            'keypress :input': 'enter'
        },
        
        render: function () {
            var data = this.model.toJSON();
            
            var compilatedTemplate = _.template(template, data);
            this.$el.html(compilatedTemplate);

            return this;
        },
        
        goBack: function () {
            Backbone.history.navigate('contas', { trigger: true });
            return false;
        },
        
        enter: function (e) {
            if (e.keyCode === 13) {
                this.submit(e);
            }
        },

        submit: function (e) {
            e.preventDefault();

            var account = {
                name: $('#name').val(),
                email: $('#email').val(),
                password: $('#password').val(),
                confirmPassword: $('#confirmPassword').val()
            };

            this.model.save(account, {
                success: function (model, response) {
                    var view = new AlertView({ type: 'success', message: 'Conta salva com sucesso!' });
                    view.render();
                    
                    $(':input').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
                },
                error: function (model, response) {
                    var view = new AlertView({ type: 'error', message: 'Erro ao atualizar a conta!' });
                    view.render();
                }
            });

            return false;
        },

        close: function () {
            $(this.el).unbind();
            $(this.el).empty();
        }
    });

    return CreateView;
});