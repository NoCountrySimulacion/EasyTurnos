using DTOs.Identity;

namespace Core.Services.Interfaces
{
   public interface IAuthenticationService
   {
      Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request);
      Task<RegistrationResponse> RegisterAsync(RegistrationRequest request);
   }
}
