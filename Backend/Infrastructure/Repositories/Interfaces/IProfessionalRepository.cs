using Domain.Entities;
using DTOs.Professional;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IProfessionalRepository : IGenericRepository<Professional, Guid>
    {
        Task<List<ProfessionalGetDto>> GetAllProfessionalsByClientId(Guid clientId);
        Task<List<ProfessionalGetDto>> GetAllProfessionalsWithSlots();
        public new Task<ProfessionalGetDto?> GetProfessionalById(Guid id);
        Task<Professional> Update(Professional entity);
    }
}
