define([
  'jquery',
  'underscore',
  'backbone',
  'views/AlertView',
  'text!templates/confirm.html'
], function (
  $,
  _,
  Backbone,
  AlertView,
  template
) {

  var ConfirmView = Backbone.View.extend({

    initialize: function () {
      this.model.on('destroy', this.remove, this);
    },

    events: {
      'click #yes': 'yes',
      'click #no': 'no'
    },

    render: function () {
      var position = $(this.el).position();
      var data = {
        left: position.left
      };

      var compilatedTemplate = _.template(template, data);
      $(this.el).append(compilatedTemplate);

      return this;
    },

    yes: function () {
      this.model.destroy({
        success: function () {
          var view = new AlertView({
            type: 'success',
            message: 'Conta deletada com sucesso!'
          });
          view.render();
        },
        error: function () {
          var view = new AlertView({
            type: 'error',
            message: 'Erro ao deletar a conta!'
          });
          view.render();
        }
      });

      return false;
    },

    no: function () {
      $(this.el).find('.confirm').remove();
      $(this.el).find('.confirm-background').remove();
    }

  });

  return ConfirmView;
});