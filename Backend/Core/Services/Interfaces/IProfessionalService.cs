using DTOs;
using DTOs.Identity;
using DTOs.Professional;

namespace Core.Services.Interfaces
{
    public interface IProfessionalService
    {
        Task<ServiceResponse<ProfessionalGetDto>> AddProfessional(ProfessionalAddDto addProfessional);
        Task<ServiceResponse<ProfessionalGetDto>> DeleteProfessional(Guid professionalId);
        Task<ServiceResponse<List<ProfessionalWithSlotsDto>>> GetAllProfessionalsWithSlots();
        Task<ServiceResponse<ProfessionalGetDto>> GetProfessionalById(Guid id);
        Task<ServiceResponse<RegistrationResponse>> RegisterProfessionalUser(ProfessionalAddDto addProfessional);
    }
}
