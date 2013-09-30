using System.Web.Http;
using System.Web.Routing;

namespace BackboneCrudCSharp.App_Start {

    public static class WebApiConfig {

        private static void AccountsRegister(HttpRouteCollection routes) {
            routes.MapHttpRoute(
                "getAccount",
                "api/accounts/{id}",
                new { controller = "Accounts", action = "Get" },
                new { httpMethod = new HttpMethodConstraint("Get") }
            );

            routes.MapHttpRoute(
                "getAllAccount",
                "api/accounts",
                new { controller = "Accounts", action = "Get" },
                new { httpMethod = new HttpMethodConstraint("Get") }
            );

            routes.MapHttpRoute(
                "recoverAccount",
                "api/accounts/{id}",
                new { controller = "Accounts", action = "Recover" },
                new { httpMethod = new HttpMethodConstraint("Post") }
            );

            routes.MapHttpRoute(
                "postAccount",
                "api/accounts",
                new { controller = "Accounts", action = "Post" },
                new { httpMethod = new HttpMethodConstraint("Post") }
            );

            routes.MapHttpRoute(
                "putAccount",
                "api/accounts",
                new { controller = "Accounts", action = "Put" },
                new { httpMethod = new HttpMethodConstraint("Put") }
            );

            routes.MapHttpRoute(
                "deleteAccount",
                "api/accounts/{id}",
                new { controller = "Accounts", action = "Delete" },
                new { httpMethod = new HttpMethodConstraint("Delete") }
            );
        }

        public static void Register(HttpConfiguration config) {
            AccountsRegister(config.Routes);
        }
    }
}
