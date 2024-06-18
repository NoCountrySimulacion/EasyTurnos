using Domain.Entities;
using System.Linq.Expressions;

namespace Infrastructure.Repositories.Interfaces;

public interface IProfessionalClientRepository : IGenericRepository<ProfessionalClient, Guid>
{
    Task<bool> AnyAsync(Expression<Func<ProfessionalClient, bool>> predicate);
    Task<ProfessionalClient?> GetProfessionalClient(Guid professionalId, Guid clientId);
}
