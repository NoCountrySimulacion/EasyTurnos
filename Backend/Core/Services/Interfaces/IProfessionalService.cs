using DTOs;
using DTOs.Professional;

namespace Core.Services.Interfaces
{
    public interface IProfessionalService
    {
        Task<ServiceResponse<List<ProfessionalGetDto>>> GetAllProfessionals();
        Task<ServiceResponse<ProfessionalGetDto>> GetProfessionalById(Guid id);
    }
}
