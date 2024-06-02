using AutoMapper;
using Azure.Core;
using Core.Services.Interfaces;
using Domain.Entities;
using DTOs;
using DTOs.Identity;
using DTOs.Professional;
using Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace Core.Services
{
    public class ProfessionalService : IProfessionalService
    {
        private readonly IProfessionalRepository _professionalRepository;
        private readonly IAuthenticationService _authenticationService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly ILogger<ProfessionalService> _logger;

        public ProfessionalService(
            IProfessionalRepository professionalRepository,
            IAuthenticationService authenticationService,
            UserManager<ApplicationUser> userManager,
            IMapper mapper, 
            ILogger<ProfessionalService> logger)
        {
            _professionalRepository = professionalRepository;
            _authenticationService = authenticationService;
            _userManager = userManager;
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

        public async Task<ServiceResponse<List<ProfessionalWithSlotsDto>>> GetAllProfessionalsWithSlots()
        {
            var serviceResponse = new ServiceResponse<List<ProfessionalWithSlotsDto>>();

            try
            {
                serviceResponse.Data = await _professionalRepository.GetAllProfessionalsWithSlots();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, $"Error getting Professionals - {ex.Message}");
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<ProfessionalGetDto>> AddProfessional(ProfessionalAddDto addProfessional)
        {
            var serviceResponse = new ServiceResponse<ProfessionalGetDto>();
            try
            {
                var newProfessional = _mapper.Map<Professional>(addProfessional);

                var professionalCreated = await _professionalRepository.Insert(newProfessional);
                await _professionalRepository.SaveChangesAsync();

                serviceResponse.Message = $"Professional with Id {professionalCreated.Id} has been created";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, $"Error adding new Professional - {ex.Message}");
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<ProfessionalGetDto>> DeleteProfessional(Guid professionalId)
        {
            var serviceResponse = new ServiceResponse<ProfessionalGetDto>();

            try
            {
                await _professionalRepository.Delete(professionalId);
                await _professionalRepository.SaveChangesAsync();

                serviceResponse.Message = $"Professional with Id {professionalId} has been deleted";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, $"Error deleting Professional {professionalId} - {ex.Message}");
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<RegistrationResponse>> RegisterProfessionalUser(ProfessionalAddDto addProfessional)
        {
            var serviceResponse = new ServiceResponse<RegistrationResponse>();

            try
            {
                var newProfessional = _mapper.Map<Professional>(addProfessional);
                addProfessional.RegistrationRequest.UserType = UserTypeOtions.Professional;
                addProfessional.RegistrationRequest.Professional = newProfessional;

                RegistrationResponse regsitrationResponse =  
                    await _authenticationService.RegisterAsync(addProfessional.RegistrationRequest);
            
                serviceResponse.Data = regsitrationResponse;
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
