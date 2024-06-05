using DTOs;
using DTOs.Client;
using DTOs.Identity;

namespace Core.Services.Interfaces;

public interface IClientService
{
    //Task<ClientCreatedDto> AddClientAsync(Guid professionalId, ClientAddDto clientAddDto);
    Task<ServiceResponse<RegistrationResponse>> RegisterClientUser(Guid professionalId, ClientAddDto clientDto);
    Task<ServiceResponse<ClientGetDto>> GetClientById(Guid id);
    Task<ServiceResponse<List<ClientListDto>>> GetClients();
    Task<ServiceResponse<bool>> RemoveProfessionalClientRelation(Guid professionalId, Guid clientId);

}
