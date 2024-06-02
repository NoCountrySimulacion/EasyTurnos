using Core.Services.Interfaces;
using Domain.Entities;
using DTOs.Client;
using DTOs.Identity;
using DTOs.jwt;
using Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Core.Services;

public class ClientService : IClientService
{
    private readonly UserManager<ApplicationUser> _userManager;
    //private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly JwtSettings _jwtSettings;
    private readonly RoleManager<ApplicationRole> _roleManager;
    //private readonly IClientRepository _clientRepository;

    public ClientService(UserManager<ApplicationUser> userManager,
        //SignInManager<ApplicationUser> signInManager, 
        IOptions<JwtSettings> jwSettings,
        RoleManager<ApplicationRole> roleManager
        //IClientRepository clientRepository
        //IProfessionalRepository professionalRepository
        )
    {
        _userManager = userManager;
        //_signInManager = signInManager;
        _jwtSettings = jwSettings.Value;
        _roleManager = roleManager;
        //_professionalRepository = professionalRepository;
        //_clientRepository = clientRepository;
    }

    public async Task<ClientCreatedDto> AddClientAsync(Guid professionalId, ClientAddDto clientAddDto)
    {
        ApplicationUser userClient = new ApplicationUser
        {
            Email = clientAddDto.Email,
            FirstName = clientAddDto.FirstName,
            LastName = clientAddDto.LastName,
            PhoneNumber = clientAddDto.PhoneNumber,
            EmailConfirmed = true,
            UserName = clientAddDto.Email,
            ProfessionalId = null,
            ClientId = null
        };

        var existingEmail = await _userManager.FindByEmailAsync(clientAddDto.Email);

        if (existingEmail == null)
        {
            var result = await _userManager.CreateAsync(userClient, clientAddDto.Password);

            if (result.Succeeded)
            {
                // Create a role
                ApplicationRole? existRole = await _roleManager.FindByNameAsync("Client");

                if (existRole is null)
                {
                    ApplicationRole newRole = new()
                    {
                        Name = "Client"
                    };
                    await _roleManager.CreateAsync(newRole);
                }
                await _userManager.AddToRoleAsync(userClient, "Client");
                
                // Generate Token
                JwtSecurityToken jwtSecurityToken = await GenerateToken(userClient);

                return new ClientCreatedDto()
                {
                    UserId = userClient.Id,
                    Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken)
                };
            }
            else
            {
                throw new Exception($"{result.Errors}");
            }
        }
        else
        {
            throw new Exception($"Email {clientAddDto.Email} already exists.");
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


}