namespace Entities.Responses
{
    public class TokenResponse
    {
        public string AccessToken { get; set; } //kullanıcı bilgileri
        public DateTime Expiration { get; set; } 
        public string RefreshToken { get; set; }
    }
}