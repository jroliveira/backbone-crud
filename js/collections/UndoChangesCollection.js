define([
  'jquery',
  'underscore',
  'backbone'
], function (
  $,
  _,
  Backbone
) {

  var UndoChangesCollection = Backbone.Collection.extend({

    initialize: function () {
      this.bind('undoableAction', this.storeLastAction, this);
    },

    storeLastAction: function (event) {
      this.lastAction = event;
      if (event.type === 'destroy') {
        this.lastAction.collection = this;
        this.lastAction.undo = function () {
          var self = this;

          $.ajax({
            type: "POST",
            url: this.collection.url,
            data: "id=" + this.model.id,
            dataType: "json",
            success: function () {
              self.collection.add(self.model);
              self.collection.lastAction = null;
            }
          });
        };
      }
    }

  });

  return UndoChangesCollection;

});