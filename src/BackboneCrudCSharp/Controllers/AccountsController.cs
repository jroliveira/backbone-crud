using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackboneCrudCSharp.Models;

namespace BackboneCrudCSharp.Controllers {

    public class AccountsController : ApiController {

        private static readonly ICollection<AccountModel> Accounts = new Collection<AccountModel> {
            new AccountModel{ id = 1, email = "a@b.c", name = "teste A"},
            new AccountModel{ id = 2, email = "b@c.d", name = "teste B"},
            new AccountModel{ id = 3, email = "c@d.e", name = "teste C"},
            new AccountModel{ id = 4, email = "d@e.f", name = "teste D"},
            new AccountModel{ id = 5, email = "e@f.g", name = "teste E"}
        };

        public IEnumerable<AccountModel> Get() {
            return Accounts;
        }

        public AccountModel Get(int id) {
            return Accounts.FirstOrDefault(c => c.id == id);
        }

        public AccountModel Put(AccountModel model) {
            try {
                var account = Accounts.FirstOrDefault(c => c.id == model.id);
                Accounts.Remove(account);

                Accounts.Add(model);

                return model;
            }
            catch {
                throw new HttpResponseException(new HttpResponseMessage {
                    StatusCode = HttpStatusCode.ExpectationFailed,
                    Content = new StringContent("Erro ao atualizar a transação!")
                });
            }
        }

        public HttpResponseMessage Post(AccountModel model) {
            try {
                var id = Accounts.Max(c => c.id) + 1;
                model.id = id;

                Accounts.Add(model);

                return Request.CreateResponse(HttpStatusCode.Created, model);
            }
            catch {
                throw new HttpResponseException(new HttpResponseMessage {
                    StatusCode = HttpStatusCode.ExpectationFailed,
                    Content = new StringContent("Erro ao inserir!")
                });
            }
        }

        public HttpResponseMessage Delete(int id) {
            try {
                var account = Accounts.FirstOrDefault(c => c.id == id);
                Accounts.Remove(account);

                return new HttpResponseMessage { StatusCode = HttpStatusCode.NoContent };
            }
            catch {
                throw new HttpResponseException(new HttpResponseMessage {
                    StatusCode = HttpStatusCode.ExpectationFailed,
                    Content = new StringContent("Erro ao deletar a transação!")
                });
            }
        }
    }
}
