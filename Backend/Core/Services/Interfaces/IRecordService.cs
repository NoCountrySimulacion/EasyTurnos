using DTOs;
using DTOs.Record;

namespace Core.Services.Interfaces
{
    public interface IRecordService
    {
        Task<ServiceResponse<bool>> AddRecord(RecordAddDto addRecord, Guid professionalId);
        Task<ServiceResponse<List<RecordGetDto>>> GetAllRecords(Guid professionalId, Guid clientId);
        Task<ServiceResponse<bool>> UpdateRecord(Guid recordId, RecordUpdateDto updateRecord);
        Task<ServiceResponse<bool>> DeleteRecord(Guid professionalId, Guid recordId);

    }
}
