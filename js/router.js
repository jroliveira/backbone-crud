define([
    'backbone',
    'views/HeaderView',
    'views/home/IndexView',
    'views/account/IndexView',
    'views/account/SaveView',
    'models/Account',
    'collections/Accounts'
], function (Backbone, HeaderView, HomeIndexView, AccountIndexView, AccountSaveView, Account, Accounts) {

    var AppRouter = Backbone.Router.extend({
        
        routes: {
            'conta/editar/:id': 'editAccount',
            'conta/criar': 'createAccount',
            'contas': 'listAccount',

            '*actions': 'defaultAction'
        },
        
        showView: function (selector, view) {
            if (this.currentView) {
                this.currentView.close();
            }

            var container = view.render();
            $(selector).html(container.el);
            this.currentView = view;
            
            return view;
        },
        
    });

    var initialize = function () {
        var appRouter = new AppRouter;

        this.headerView = new HeaderView;
        $('header').html(this.headerView.render().el);
        
        appRouter.on('route:defaultAction', function () {
            var view = new HomeIndexView;
            this.showView('article', view);
        });
        
        appRouter.on('route:editAccount', function (id) {
            var self = this;
            
            var model = new Account({ id: id });
            model.fetch({
                success: function () {
                    var view = new AccountSaveView({ model: model });
                    self.showView('article', view);
                }
            });
        });
        
        appRouter.on('route:createAccount', function () {
            var model = new Account;
            var view = new AccountSaveView({ model: model });
            this.showView('article', view);
        });
        
        appRouter.on('route:listAccount', function () {
            var self = this;
            
            var collection = new Accounts;
            collection.fetch({
                success: function() {
                    var view = new AccountIndexView({ collection: collection });
                    self.showView('article', view);
                }
            });
        });

        Backbone.history.start({ pushState: false, root: '/' });
    };

    return { initialize: initialize };
});