namespace SmartTaskManagementApi.Models
{
    public class AuthenticateModel
    {
        public string Token { get; set; } = string.Empty;
        public User User { get; set; } = null!;
    }
}
