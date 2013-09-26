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
            new AccountModel{ id = 1, email = "junior@gmail.com", name = "teste A", password = "teste", confirmPassword = "teste"},
            new AccountModel{ id = 2, email = "junior@gmail.com", name = "teste B", password = "teste", confirmPassword = "teste"},
            new AccountModel{ id = 3, email = "junior@gmail.com", name = "teste C", password = "teste", confirmPassword = "teste"},
            new AccountModel{ id = 4, email = "junior@gmail.com", name = "teste D", password = "teste", confirmPassword = "teste"},
            new AccountModel{ id = 5, email = "junior@gmail.com", name = "teste E", password = "teste", confirmPassword = "teste"},
            new AccountModel{ id = 6, email = "junior@gmail.com", name = "teste F", password = "teste", confirmPassword = "teste"},
            new AccountModel{ id = 7, email = "junior@gmail.com", name = "teste G", password = "teste", confirmPassword = "teste"},
            new AccountModel{ id = 8, email = "junior@gmail.com", name = "teste H", password = "teste", confirmPassword = "teste"},
            new AccountModel{ id = 9, email = "junior@gmail.com", name = "teste I", password = "teste", confirmPassword = "teste"},
            new AccountModel{ id = 10, email = "junior@gmail.com", name = "teste J", password = "teste", confirmPassword = "teste"}
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
                    Content = new StringContent("Erro ao atualizar a conta!")
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
                    Content = new StringContent("Erro ao deletar a conta!")
                });
            }
        }
    }
}
