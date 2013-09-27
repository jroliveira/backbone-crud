define(['router', 'underscore', 'backbone'], function (Router, _, Backbone) {

    Backbone.View.prototype.close = function() {
        this.remove();
        this.unbind();
        if (this.onClose) {
            this.onClose();
        }
    };

    var initialize = function () {
        Router.initialize();
    };
    
    return {
        initialize: initialize
    };
});