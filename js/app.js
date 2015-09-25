define([
  'router',
  'underscore',
  'backbone',

  'text!templates/loading.html'
], function (
  Router,
  _,
  Backbone,

  templateLoading
) {

  Backbone.View.prototype.close = function () {
    this.remove();
    this.unbind();
    if (this.onClose) {
      this.onClose();
    }
  };

  var collectionFetch = Backbone.Collection.prototype.fetch;
  Backbone.Collection.prototype.fetch = function (options) {
    this.trigger('fetch:started');
    $('article').html(templateLoading);
    collectionFetch.call(this, options);
  };

  var initialize = function () {
    Router.initialize();
  };

  return {
    initialize: initialize
  };
  
});