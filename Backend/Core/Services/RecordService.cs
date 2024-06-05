using AutoMapper;
using Core.Services.Interfaces;
using Domain.Entities;
using DTOs;
using DTOs.Record;
using Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Logging;

namespace Core.Services
{
    public class RecordService : IRecordService
    {
        private readonly IMapper _mapper;
        private readonly IRecordRepository _recordRepository;
        private readonly ILogger<RecordService> _logger;

        public RecordService(IMapper mapper, IRecordRepository recordRepository, ILogger<RecordService> logger)
        {
            _mapper = mapper;
            _recordRepository = recordRepository;
            _logger = logger;
        }

        public async Task<ServiceResponse<List<RecordGetDto>>> AddRecord(RecordAddDto addRecord, Guid professionalId)
        {
            var serviceResponse = new ServiceResponse<List<RecordGetDto>>();

            try
            {
                var newRecord = _mapper.Map<Record>(addRecord);
                newRecord.ProfessionalId = professionalId;
                newRecord.ClientId = addRecord.ClientId;               
                await _recordRepository.Insert(newRecord);
                await _recordRepository.SaveChangesAsync();

                var dbRecords = await _recordRepository.GetAllRecords(professionalId, newRecord.ClientId);

                serviceResponse.Data = dbRecords;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }

            return serviceResponse;
        }

        public Task<ServiceResponse<List<RecordGetDto>>> DeleteRecord(Guid recordId)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<RecordGetDto>>> GetAllRecords(Guid professionalId, Guid clientId)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<RecordGetDto>> GetRecordById(Guid recordId)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<RecordGetDto>>> UpdateRecord(Guid recordId, RecordUpdateDto updateRecord)
        {
            throw new NotImplementedException();
        }
    }
}
