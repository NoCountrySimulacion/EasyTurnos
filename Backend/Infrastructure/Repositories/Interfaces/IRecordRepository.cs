using Domain.Entities;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IRecordRepository : IGenericRepository<Record, Guid>
    {
    }
}
