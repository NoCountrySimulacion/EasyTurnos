using Domain.Entities;
using DTOs.Client;

namespace Infrastructure.Repositories.Interfaces;

public interface IClientRepository : IGenericRepository<Client, Guid>
{
    //Task<ClientGetDto?> GetById(Guid id);
    //Task<bool> RemoveProfessionalClientRelation(Guid professionalId, Guid clientId);
    //Task<ClientUpdateResponse?> GetByIdToUpdate(Guid id);
}
