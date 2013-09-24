using System.Web.Mvc;
using System.Web.Routing;

namespace BackboneCrudCSharp.App_Start {

    public class RouteConfig {

        public static void AccountRegisterRoutes(RouteCollection routes) {
            routes.MapRoute(
                "EditAccount",
                "conta/editar/{id}",
                new { controller = "Home", action = "Index" },
                new { httpMethod = new HttpMethodConstraint("Get") }
            );

            routes.MapRoute(
                "CreateAccount",
                "conta/criar",
                new { controller = "Home", action = "Index" },
                new { httpMethod = new HttpMethodConstraint("Get") }
            );

            routes.MapRoute(
                "IndexAccount",
                "contas",
                new { controller = "Home", action = "Index" },
                new { httpMethod = new HttpMethodConstraint("Get") }
            );
        }

        public static void RegisterRoutes(RouteCollection routes) {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            AccountRegisterRoutes(routes);

            routes.MapRoute(
                "Home",
                "",
                new { controller = "Home", action = "Index" },
                new { httpMethod = new HttpMethodConstraint("Get") }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}