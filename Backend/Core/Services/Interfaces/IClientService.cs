using DTOs;
using DTOs.Client;
using DTOs.Identity;

namespace Core.Services.Interfaces;

public interface IClientService
{
    Task<ServiceResponse<RegistrationResponse>> RegisterClientUser(Guid professionalId, ClientAddDto clientDto);
    Task<ServiceResponse<ClientGetDto>> GetClientById(Guid professionalId, Guid clientId);
    Task<ServiceResponse<List<ClientListDto>>> GetClients(Guid professionalId);
    Task<ServiceResponse<bool>> RemoveProfessionalClientRelation(Guid professionalId, Guid clientId);
    Task<ServiceResponse<ClientGetDto>> UpdateClientAsync(Guid professionalId, Guid clientId, ClientUpdateDto clientRequest);
}
