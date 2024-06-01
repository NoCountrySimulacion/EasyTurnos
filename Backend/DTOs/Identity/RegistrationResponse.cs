namespace DTOs.Identity
{
   public class RegistrationResponse
   {
      public Guid UserId { get; set; }
      public string Token { get; set; } = string.Empty;

   }
}
