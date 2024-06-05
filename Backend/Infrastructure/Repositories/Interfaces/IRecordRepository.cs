using Domain.Entities;
using DTOs.Record;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IRecordRepository : IGenericRepository<Record, Guid>
    {
        public new Task<List<RecordGetDto>> GetAllRecords(Guid professionalId, Guid clientId);
    }
}
