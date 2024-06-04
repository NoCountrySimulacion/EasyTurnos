using AutoMapper;
using Core.Services.Interfaces;
using Domain.Entities;
using DTOs;
using DTOs.Client;
using DTOs.Identity;
using Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

public class ClientService : IClientService

{
    private readonly IClientRepository _clientRepository;
    private readonly IAuthenticationService _authenticationService;
    private readonly IMapper _mapper;
    private readonly ILogger<ClientService> _logger;

    public ClientService(
            IClientRepository clientRepository,
            IAuthenticationService authenticationService,
            IMapper mapper,
            ILogger<ClientService> logger)
    {
        _clientRepository = clientRepository;
        _authenticationService = authenticationService;
        _mapper = mapper;
        _logger = logger;
    }

    //public Task<ClientCreatedDto> AddClientAsync(Guid professionalId, ClientAddDto clientAddDto)
    //{
    //    throw new NotImplementedException();
    //}

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
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex, $"{ex.Message}");
        }

        return serviceResponse;
    }

    public async Task<ServiceResponse<List<ClientListDto>>> GetClients()
    {
        var serviceResponse = new ServiceResponse<List<ClientListDto>>();
        try
        {
            var clients = await _clientRepository.GetAll()
               .Include(c => c.ApplicationUser)
               .ToListAsync();

            var clientsList = _mapper.Map<List<ClientListDto>>(clients);

            serviceResponse.Data = clientsList;
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex, $"Error getting Clients - {ex.Message}");
        }

        return serviceResponse;
    }
}