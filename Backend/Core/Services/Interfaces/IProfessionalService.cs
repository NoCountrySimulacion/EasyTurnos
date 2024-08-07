﻿using DTOs;
using DTOs.Identity;
using DTOs.Professional;

namespace Core.Services.Interfaces
{
    public interface IProfessionalService
    {
        Task<ServiceResponse<ProfessionalGetDto>> AddProfessional(ProfessionalAddDto addProfessional);
        Task<ServiceResponse<ProfessionalGetDto>> DeleteProfessional(Guid professionalId);
        Task<ServiceResponse<List<ProfessionalGetDto>>> GetAllProfessionalsByClientId(Guid clientId);
        Task<ServiceResponse<List<ProfessionalGetDto>>> GetAllProfessionalsWithSlots();
        Task<ServiceResponse<ProfessionalGetDto>> GetProfessionalById(Guid id);
        Task<ServiceResponse<RegistrationResponse>> RegisterProfessionalUser(RegistrationRequest request);
        Task<ServiceResponse<ProfessionalGetDto>> UpdateProfessional(Guid professionalId, ProfessionalAddDto addProfessional);
        Task<ServiceResponse<ProfessionalGetDto>> UpdateProfessionalUser(string currentEmail, ProfessionalAddDto addProfessional);
    }
}
