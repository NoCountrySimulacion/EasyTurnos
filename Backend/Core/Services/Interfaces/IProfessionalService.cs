using DTOs;
using DTOs.Professional;

namespace Core.Services.Interfaces
{
    public interface IProfessionalService
    {
        Task<ServiceResponse<ProfessionalGetDto>> GetProfessionalById(Guid id);
    }
}
