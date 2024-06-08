using AutoMapper;
using Core.Services.Interfaces;
using Domain.Entities;
using DTOs;
using DTOs.Client;
using DTOs.Identity;
using Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Azure.Core;

namespace Core.Services;

public class ClientService : IClientService
{
    private readonly IClientRepository _clientRepository;
    private readonly IAuthenticationService _authenticationService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;
    private readonly ILogger<ClientService> _logger;

    public ClientService(
            IClientRepository clientRepository,
            IAuthenticationService authenticationService,
            IMapper mapper,
            ILogger<ClientService> logger,
            UserManager<ApplicationUser> userManager)
    {
        _clientRepository = clientRepository;
        _authenticationService = authenticationService;
        _mapper = mapper;
        _logger = logger;
        _userManager = userManager;
    }

    public async Task<ServiceResponse<RegistrationResponse>> RegisterClientUser(Guid professionalId, ClientAddDto registerRequest)
    {
        var serviceResponse = new ServiceResponse<RegistrationResponse>();

        try
        {
            // Client Entity is created
            var newClient = _mapper.Map<Client>(registerRequest);

            // Set relation between Professional and Client // NOT THE BEST WAY TO DO THIS BUT THE FASTEST WAY
            newClient.ProfessionalClients = new List<ProfessionalClient>
            {
                new ProfessionalClient() {ProfessionalId = professionalId, ClientId = newClient.Id }
            };

            // Set Client role for User
            registerRequest.RegistrationRequest.UserType = UserTypeOptions.Client;

            // Set DB relation between Client and its User
            registerRequest.RegistrationRequest.Client = newClient;

            // Register User with its client entity assigned
            RegistrationResponse registrationResponse =
                await _authenticationService.RegisterAsync(registerRequest.RegistrationRequest);

            serviceResponse.Data = registrationResponse;
            serviceResponse.Message = $"Client with Id {newClient.Id} has been created";

        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex, $"Error adding new Client - {ex.Message}");
        }

        return serviceResponse;

    }

    public async Task<ServiceResponse<ClientGetDto>> GetClientById(Guid id)
    {
        var serviceResponse = new ServiceResponse<ClientGetDto>();
        try
        {
            serviceResponse.Data = await _clientRepository.GetById(id);
            serviceResponse.Message = "Client retrieved successfully.";
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex, $"{ex.Message}");
        }

        return serviceResponse;
    }

    public async Task<ServiceResponse<List<ClientListDto>>> GetClients(Guid professionalId)
    {
        var serviceResponse = new ServiceResponse<List<ClientListDto>>();
        try
        {
            var clients = await _clientRepository.GetAll()
               .Include(c => c.ApplicationUser)
               .Where(c => c.ProfessionalClients.Any(pc => pc.ProfessionalId == professionalId))
               .ToListAsync();

            var clientsList = _mapper.Map<List<ClientListDto>>(clients);

            serviceResponse.Data = clientsList;
            serviceResponse.Message = "Clients retrieved successfully.";
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex, $"Error getting Clients - {ex.Message}");
        }

        return serviceResponse;
    }

    public async Task<ServiceResponse<bool>> RemoveProfessionalClientRelation(Guid professionalId, Guid clientId)
    {
        try
        {
            var result = await _clientRepository.RemoveProfessionalClientRelation(professionalId, clientId);
            if (result)
            {
                return new ServiceResponse<bool> { Data = true, Success = true, Message = "Relation removed successfully." };
            }
            else
            {
                return new ServiceResponse<bool> { Data = false, Success = false, Message = "Relation not found." };
            }
        }
        catch (Exception ex)
        {
            return new ServiceResponse<bool> { Data = false, Success = false, Message = $"An error occurred: {ex.Message}" };
        }
    }

    public async Task<ServiceResponse<ClientGetDto>> UpdateClientAsync(Guid clientId, ClientUpdateRequest clientRequest)
    {
        //var client = await _clientRepository.GetById(clientId);
        var client = await _clientRepository.GetByIdToUpdate(clientId);

        if (client == null)
        {
            return new ServiceResponse<ClientGetDto> { Success = false, Message = "Client not found." };
        }

        var user = client.ApplicationUser;
        if (user == null)
        {
            return new ServiceResponse<ClientGetDto> { Success = false, Message = "Associated user not found." };
        }

        //var client = await _authenticationService.UpdateUserAsync(user);

        // Update Client and ApplicationUser properties
        client.BirthDate = clientRequest.BirthDate;
        user.FirstName = clientRequest.FirstName;
        user.LastName = clientRequest.LastName;
        user.Email = clientRequest.Email;
        user.PhoneNumber = clientRequest.PhoneNumber;
        user.UserName = clientRequest.Email;

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            return new ServiceResponse<ClientGetDto> { Success = false, Message = "Failed to update user." };
        }

        // Update password if provided
        if (!string.IsNullOrWhiteSpace(clientRequest.Password))
        {
            var passwordResult = await _userManager.RemovePasswordAsync(user);
            if (passwordResult.Succeeded)
            {
                passwordResult = await _userManager.AddPasswordAsync(user, clientRequest.Password);
                if (!passwordResult.Succeeded)
                {
                    return new ServiceResponse<ClientGetDto> { Success = false, Message = "Failed to update password." };
                }
            }
            else
            {
                return new ServiceResponse<ClientGetDto> { Success = false, Message = "Failed to remove old password." };
            }
        }

        var clientToUpdate = _mapper.Map<Client>(client);
        _clientRepository.Update(clientToUpdate);
        await _clientRepository.SaveChangesAsync();

        var clientGetDto = _mapper.Map<ClientGetDto>(client);
        return new ServiceResponse<ClientGetDto> { Data = clientGetDto, Success = true, Message = "Client updated successfully." };
    }
}