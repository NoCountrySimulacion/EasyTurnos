using Domain.Entities;
using DTOs.Professional;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IProfessionalRepository : IGenericRepository<Professional, Guid>
    {
        Task<List<ProfessionalWithSlotsDto>> GetAllProfessionalsByClientId(Guid clientId);
        Task<List<ProfessionalWithSlotsDto>> GetAllProfessionalsWithSlots();
        public new Task<ProfessionalGetDto?> GetProfessionalById(Guid id);
        Task<Professional> Update(Professional entity);
    }
}
