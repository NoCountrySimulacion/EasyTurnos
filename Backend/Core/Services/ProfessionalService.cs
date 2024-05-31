using AutoMapper;
using Core.Services.Interfaces;
using Domain.Entities;
using DTOs;
using DTOs.Professional;
using Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Logging;

namespace Core.Services
{
    public class ProfessionalService : IProfessionalService
    {
        private readonly IProfessionalRepository _professionalRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<ProfessionalService> _logger;

        public ProfessionalService(
            IProfessionalRepository professionalRepository, 
            IMapper mapper, 
            ILogger<ProfessionalService> logger)
        {
            _professionalRepository = professionalRepository;
            _mapper = mapper;
            _logger = logger;

        }

        public async Task<ServiceResponse<ProfessionalGetDto>> GetProfessionalById(Guid id)
        {
            var serviceResponse = new ServiceResponse<ProfessionalGetDto>();
            try
            {
                serviceResponse.Data = await _professionalRepository.GetById(id);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, $"{ex.Message}");
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<ProfessionalGetDto>>> GetAllProfessionals()
        {
            var serviceResponse = new ServiceResponse<List<ProfessionalGetDto>>();

            try
            {
                serviceResponse.Data = await _professionalRepository.GetAll();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, $"Error getting Professionals - {ex.Message}");
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<ProfessionalGetDto>>> AddProfessional(ProfessionalAddDto addProfessional)
        {
            var serviceResponse = new ServiceResponse<List<ProfessionalGetDto>>();
            try
            {
                var newProfessional = _mapper.Map<Professional>(addProfessional);

                await _professionalRepository.Insert(newProfessional);
                await _professionalRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, $"Error adding new Professional - {ex.Message}");
            }
            return serviceResponse;
        }



    }
}
