using Domain.Entities;
using DTOs.Slot;

namespace Infrastructure.Repositories.Interfaces
{
    public interface ISlotRepository : IGenericRepository<Slot, Guid>
    {
        public new Task<List<SlotGetDto>> GetAllSlots(Guid professionalId); 
    }
}
