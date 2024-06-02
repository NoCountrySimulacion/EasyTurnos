namespace DTOs.Identity
{
   public class AuthenticationResponse
   {
      public Guid Id { get; set; }
      public string Email { get; set; } = string.Empty;
      public string Token { get; set; } = string.Empty;
   }
}
