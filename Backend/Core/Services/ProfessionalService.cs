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
using Microsoft.IdentityModel.Tokens;

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

        public async Task<ServiceResponse<List<ProfessionalGetDto>>> GetAllProfessionalsWithSlots()
        {
            var serviceResponse = new ServiceResponse<List<ProfessionalGetDto>>();

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

        public async Task<ServiceResponse<List<ProfessionalGetDto>>> GetAllProfessionalsByClientId(Guid clientId)
        {
            var serviceResponse = new ServiceResponse<List<ProfessionalGetDto>>();

            try
            {
                serviceResponse.Data = await _professionalRepository.GetAllProfessionalsByClientId(clientId);
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

                professional.Speciality = addProfessional.Speciality;
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

        public async Task<ServiceResponse<ProfessionalGetDto>> UpdateProfessionalUser(string currentEmail, ProfessionalAddDto addProfessional)
        {
            var serviceResponse = new ServiceResponse<ProfessionalGetDto>();
            try
            {
                
                // Check if new email alredy exist in DB
                ApplicationUser userWithTheSameEmail;

                if (!addProfessional.newEmail.IsNullOrEmpty())
                {
                    userWithTheSameEmail = await _userManager.FindByEmailAsync(addProfessional.newEmail);

                    if (userWithTheSameEmail != null)
                        throw new ArgumentException($"User's email: {addProfessional.newEmail} already exists");
                }

                // Check if current email actually exists
                ApplicationUser user = await _userManager.FindByEmailAsync(currentEmail);
                if (user == null)
                    throw new ArgumentException($"There are not records with email: {currentEmail}");
                
                var professional = await _professionalRepository.GetById(user.ProfessionalId.Value);
                professional.Speciality = addProfessional.Speciality;
                professional.Description = addProfessional.Description;
                professional.Location = addProfessional.Location;

                user.FirstName = addProfessional.FirstName;
                user.LastName = addProfessional.LastName;
                user.PhoneNumber = addProfessional.PhoneNumber;
                user.Professional = professional;

                if (!addProfessional.newEmail.IsNullOrEmpty())
                {
                    user.Email = addProfessional.newEmail;
                    user.UserName = addProfessional.newEmail;
                }

                var result = await _userManager.UpdateAsync(user);

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
