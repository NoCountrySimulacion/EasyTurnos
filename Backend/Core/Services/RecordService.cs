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

        public async Task<ServiceResponse<bool>> AddRecord(RecordAddDto addRecord, Guid professionalId)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                var newRecord = _mapper.Map<Record>(addRecord);
                newRecord.ProfessionalId = professionalId;
                newRecord.ClientId = addRecord.ClientId;
                await _recordRepository.Insert(newRecord);
                await _recordRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "New record added successfully";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> DeleteRecord(Guid professionalId, Guid recordId)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                await _recordRepository.DeleteRecord(professionalId, recordId);
                await _recordRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "Record deleted successfully";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<RecordGetDto>>> GetAllRecords(Guid professionalId, Guid clientId)
        {
            var serviceResponse = new ServiceResponse<List<RecordGetDto>>();

            try
            {
                serviceResponse.Data = await _recordRepository.GetAllRecords(professionalId, clientId);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> UpdateRecord(Guid recordId, RecordUpdateDto updatedRecord)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                var dbRecord = await _recordRepository.GetById(recordId);

                if (dbRecord == null)
                {
                    throw new Exception($"Record Id '{recordId}' was not found.");
                }

                _mapper.Map(updatedRecord, dbRecord);

                await _recordRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "Record updated successfully";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }
            return serviceResponse;
        }
    }
}
