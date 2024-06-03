using Domain.Entities;
using DTOs.Client;

namespace Infrastructure.Repositories.Interfaces;

public interface IClientRepository : IGenericRepository<Client, Guid>
{
    public Task<ClientCreatedDto> Insert(ClientAddDto clientAddDto);
}
