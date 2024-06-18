using Azure.Core;
using Core.Services.Interfaces;
using Domain.Entities;
using DTOs.Identity;
using DTOs.jwt;
using Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Core.Services
{
   public class AuthenticationService : IAuthenticationService
   {
      private readonly UserManager<ApplicationUser> _userManager;
      private readonly SignInManager<ApplicationUser> _signInManager;
      private readonly JwtSettings _jwtSettings;
      private readonly RoleManager<ApplicationRole> _roleManager;
      private readonly IProfessionalRepository _professionalRepository;

      public AuthenticationService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IOptions<JwtSettings> jwSettings, RoleManager<ApplicationRole> roleManager, IProfessionalRepository professionalRepository)
      {
         _userManager = userManager;
         _signInManager = signInManager;
         _roleManager = roleManager;
         _professionalRepository = professionalRepository;
         // IOptions<JwtSettings> provides access to the JwtSettings instance 
         _jwtSettings = jwSettings.Value;
      }


      public async Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request)
      {
         var user = await _userManager.FindByEmailAsync(request.Email);

         if (user == null)
         {
            throw new Exception($"User with {request.Email} not found.");
         }

         var result = await _signInManager.PasswordSignInAsync(user.UserName, request.Password, false, lockoutOnFailure: false);

         if (!result.Succeeded)
         {
            throw new Exception($"Credentials for '{request.Email} aren't valid'.");
         }

         JwtSecurityToken jwtSecurityToken = await GenerateToken(user);

         AuthenticationResponse response = new AuthenticationResponse
         {
            UserId = user.Id,
            Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName
         };

         return response;
      }

      public async Task<RegistrationResponse> RegisterAsync(RegistrationRequest request)
      {
         ApplicationUser user = new ApplicationUser
         {
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            PhoneNumber = request.PhoneNumber,
            EmailConfirmed = true,
            UserName = request.Email,
            Professional = request.Professional,
            Client = request.Client
         };

         var existingEmail = await _userManager.FindByEmailAsync(request.Email);

         // Cheking role
         if (await AdminUserExistsAsync(request.UserType))
         {
            throw new ArgumentException($"User Admin already exists!");
         }

         if (existingEmail == null)
         {
            var result = await _userManager.CreateAsync(user, request.Password);

            if (result.Succeeded)
            {
               // Create a role           
               await CreateRole(user, request.UserType);

               // Generate Token
               JwtSecurityToken jwtSecurityToken = await GenerateToken(user);

               return new RegistrationResponse()
               {
                  UserId = user.Id,
                  Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                  Email = user.Email,
                  FirstName = user.FirstName,
                  LastName = user.LastName
               };
            }
            else
            {
               throw new Exception($"{result.Errors}");
            }
         }
         else
         {
            throw new Exception($"Email {request.Email} already exists.");
         }
      }

      private async Task<JwtSecurityToken> GenerateToken(ApplicationUser user)
      {
         var userClaims = await _userManager.GetClaimsAsync(user);
         var roles = await _userManager.GetRolesAsync(user);

         var roleClaims = new List<Claim>();

         foreach (var role in roles)
         {
            roleClaims.Add(new Claim(ClaimTypes.Role, role));
         }

         IEnumerable<Claim> claims = new[]
         {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("userId", user.Id.ToString()),
                new Claim("professionalId", user.ProfessionalId.ToString()),
                new Claim("clientId", user.ClientId.ToString()),
         }
         .Union(userClaims)
         .Union(roleClaims);

         var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
         var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

         var jwtSecurityToken = new JwtSecurityToken(
             issuer: _jwtSettings.Issuer,
             audience: _jwtSettings.Audience,
             claims: claims,
             expires: DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes),
             signingCredentials: signingCredentials);
         return jwtSecurityToken;
      }

      private async Task<bool> CreateRole(ApplicationUser user, UserTypeOptions userType)
      {
         bool roleAssigned = false;

         // Creates a role if not exists 
         ApplicationRole? existRole = await _roleManager.FindByNameAsync(userType.ToString());

         if (existRole is null)
         {
            ApplicationRole newRole = new()
            {
               Name = userType.ToString()
            };
            await _roleManager.CreateAsync(newRole);
         }

         // Add a role to the user
         switch (userType)
         {
            case UserTypeOptions.Admin:
               await _userManager.AddToRoleAsync(user, userType.ToString());
               roleAssigned = true;
               return roleAssigned;
            case UserTypeOptions.Client:
               await _userManager.AddToRoleAsync(user, userType.ToString());
               roleAssigned = true;
               return roleAssigned;

            case UserTypeOptions.Professional:
               await _userManager.AddToRoleAsync(user, userType.ToString());
               roleAssigned = true;
               return roleAssigned;
            default: return false;
         }


      }

      private async Task<bool> AdminUserExistsAsync(UserTypeOptions? userType)
      {
         if (userType == UserTypeOptions.Admin)
         {
            ApplicationRole? adminRole = await _roleManager.FindByNameAsync("admin");

            if (adminRole is null) return false;

            var users = await _userManager.GetUsersInRoleAsync(adminRole.Name);

            if (users.Count() > 0)
            {
               return true;
            }
            else
            {
               return false;
            }
         }
         else
            return false;
      }
     
   }
}
