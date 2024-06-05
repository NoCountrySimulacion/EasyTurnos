using AutoMapper;
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
                serviceResponse.Data = await _professionalRepository.GetProfessionalById(id);
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

        public async Task<ServiceResponse<ProfessionalGetDto>> UpdateProfessional(Guid professionalId, ProfessionalAddDto addProfessional)
        {
            var serviceResponse = new ServiceResponse<ProfessionalGetDto>();
            try
            {
                var professional = await _professionalRepository.GetById(professionalId);

                professional.Specialty = addProfessional.Specialty;
                professional.Description = addProfessional.Description;

                await _professionalRepository.Update(professional);
                await _professionalRepository.SaveChangesAsync();

                serviceResponse.Message = $"Professional with Id {professional.Id} has been updated, successfully";
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

        public async Task<ServiceResponse<RegistrationResponse>> RegisterProfessionalUser(RegistrationRequest request)
        {
            var serviceResponse = new ServiceResponse<RegistrationResponse>();

            try
            {
                request.UserType = UserTypeOptions.Professional;
                request.Professional = new Professional();

                RegistrationResponse regsitrationResponse =  
                    await _authenticationService.RegisterAsync(request);
            
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
