define([
    'backbone',
    'views/home/IndexView',
    'views/account/IndexView',
    'views/account/SaveView',
    'models/Account',
    'collections/Accounts'
], function (Backbone, HomeIndexView, AccountIndexView, AccountSaveView, Account, Accounts) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            'conta/editar/:id': 'editAccount',
            'conta/criar': 'createAccount',
            'contas': 'listAccount',
            
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {
        var appRouter = new AppRouter;
        
        appRouter.on('route:defaultAction', function () {
            var view = new HomeIndexView;
            view.render();
        });
        
        appRouter.on('route:editAccount', function (id) {
            var model = new Account({ id: id });
            model.fetch({
                success: function (account) {
                    var view = new AccountSaveView({ model: account });
                    view.render();
                }
            });
        });
        
        appRouter.on('route:createAccount', function () {
            var model = new Account;
            var view = new AccountSaveView({ model: model });
            var content = view.render();
            
            $('article > .container').html(content.el);
        });
        
        appRouter.on('route:listAccount', function () {
            var collection = new Accounts;
            collection.fetch({
                success: function() {
                    var view = new AccountIndexView({ collection: collection });
                    view.render();
                }
            });
        });

        Backbone.history.start({ pushState: true, root: '/' });
    };

    return { initialize: initialize };
});