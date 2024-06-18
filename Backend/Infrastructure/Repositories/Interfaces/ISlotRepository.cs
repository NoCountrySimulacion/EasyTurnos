using Domain.Entities;
using DTOs.Slot;

namespace Infrastructure.Repositories.Interfaces
{
    public interface ISlotRepository : IGenericRepository<Slot, Guid>
    {
        public new Task<List<SlotGetDto>> GetAllSlots(Guid professionalId);
        public new Task<bool> DeleteSlots(Guid professionalId, List<Guid> slotIds);
        Task<bool> DeleteAllSlotsByProfessionalId(Guid professionalId);
    }
}
