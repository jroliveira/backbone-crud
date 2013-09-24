namespace BackboneCrudCSharp.Models {

    public class AccountModel {

        // ReSharper disable InconsistentNaming
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string confirmPassword { get; set; }
        // ReSharper restore InconsistentNaming
    }
}