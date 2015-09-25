define([
  'jquery',
  'underscore',
  'backbone',
], function (
  $,
  _,
  Backbone
) {

  var UndoChangesModel = Backbone.Model.extend({

    initialize: function () {
      this.bind('change', this.storeAction, this);
      this.bind('destroy', this.storeAction, this);
    },

    storeAction: function (event) {
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

  });

  return UndoChangesModel;
});