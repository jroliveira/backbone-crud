define(['router', 'underscore'], function (Router, _) {
    
    var initialize = function () {
        
        //_.templateSettings = {
        //    interpolate: /\{\{(.+?)\}\}/g,
        //    evaluate: /\{%([\s\S]+?)%\}/g,
        //    escape: /\{%-([\s\S]+?)%\}/g
        //};

        Router.initialize();
    };
    
    return {
        initialize: initialize
    };
});