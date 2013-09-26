using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BackboneCrudCSharp.Models;

namespace BackboneCrudCSharp.Controllers {

    public class AccountsController : ApiController {

        private static readonly ICollection<Account> Accounts = new Collection<Account> {
            new Account{ Id = 1, Name = "teste A", Email = "junior@gmail.com", Password = "teste", Deleted = false },
            new Account{ Id = 2, Name = "teste B", Email = "junior@gmail.com", Password = "teste", Deleted = false },
            new Account{ Id = 3, Name = "teste C", Email = "junior@gmail.com", Password = "teste", Deleted = false },
            new Account{ Id = 4, Name = "teste D", Email = "junior@gmail.com", Password = "teste", Deleted = false },
            new Account{ Id = 5, Name = "teste E", Email = "junior@gmail.com", Password = "teste", Deleted = false },
            new Account{ Id = 6, Name = "teste F", Email = "junior@gmail.com", Password = "teste", Deleted = false },
            new Account{ Id = 7, Name = "teste G", Email = "junior@gmail.com", Password = "teste", Deleted = false },
            new Account{ Id = 8, Name = "teste H", Email = "junior@gmail.com", Password = "teste", Deleted = false },
            new Account{ Id = 9, Name = "teste I", Email = "junior@gmail.com", Password = "teste", Deleted = false }
        };

        public IEnumerable<dynamic> Get() {
            return Accounts.Where(account => account.Deleted == false)
                           .Select(account => new { id = account.Id, name = account.Name, email = account.Email });
        }

        public dynamic Get(int id) {
            return Accounts.Where(account => account.Id == id)
                           .Select(account => new { id = account.Id, name = account.Name, email = account.Email })
                           .FirstOrDefault();
        }

        public dynamic Put(AccountModel model) {
            try {
                var account = Accounts.FirstOrDefault(c => c.Id == model.id);
                Accounts.Remove(account);

                Accounts.Add(new Account {
                    Id = model.id,
                    Name = model.name,
                    Email = model.email,
                    Password = model.password,
                    Deleted = false
                });

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
                var id = Accounts.Max(c => c.Id) + 1;
                model.id = id;

                Accounts.Add(new Account {
                    Id = model.id,
                    Name = model.name,
                    Email = model.email,
                    Password = model.password,
                    Deleted = false
                });

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
                var account = Accounts.FirstOrDefault(c => c.Id == id);
                Accounts.Remove(account);

                account.Deleted = true;
                Accounts.Add(account);

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

    public class Account {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Deleted { get; set; }
    }
}
