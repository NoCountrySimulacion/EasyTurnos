using Domain.Entities;
using DTOs.Professional;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IProfessionalRepository : IGenericRepository<Professional, Guid>
    {
        Task<List<ProfessionalWithSlotsDto>> GetAllProfessionalsWithSlots();
        public new Task<ProfessionalGetDto?> GetById(Guid id);
    }
}
