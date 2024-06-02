using DTOs;
using DTOs.Slot;

namespace Core.Services.Interfaces
{
    public interface ISlotService
    {
        Task<ServiceResponse<List<SlotGetDto>>> AddSlot(SlotAddDto addSlot, Guid professionalId);
        Task<ServiceResponse<List<SlotGetDto>>> GetAllSlots(Guid professionalId);
        Task<ServiceResponse<List<SlotGetDto>>> DeleteSlot(Guid professionalId, Guid slotId);
    }
}
