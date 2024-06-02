using DTOs.Client;

namespace Core.Services.Interfaces;

public interface IClientService
{
    Task<ClientCreatedDto> AddClientAsync(Guid professionalId, ClientAddDto clientAddDto);
}
