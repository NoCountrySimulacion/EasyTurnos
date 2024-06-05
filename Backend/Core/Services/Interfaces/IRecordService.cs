using DTOs;
using DTOs.Record;

namespace Core.Services.Interfaces
{
    public interface IRecordService
    {
        Task<ServiceResponse<List<RecordGetDto>>> AddRecord(RecordAddDto addRecord, Guid professionalId);
        Task<ServiceResponse<List<RecordGetDto>>> GetAllRecords(Guid professionalId, Guid clientId);
        Task<ServiceResponse<RecordGetDto>> GetRecordById(Guid recordId);
        Task<ServiceResponse<List<RecordGetDto>>> UpdateRecord(Guid recordId, RecordUpdateDto updateRecord);
        Task<ServiceResponse<List<RecordGetDto>>> DeleteRecord(Guid recordId);

    }
}
