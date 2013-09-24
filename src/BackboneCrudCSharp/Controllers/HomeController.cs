using System.Web.Mvc;

namespace BackboneCrudCSharp.Controllers {

    public class HomeController : Controller {

        [HttpGet]
        public ActionResult Index() {
            return View();
        }
    }
}
