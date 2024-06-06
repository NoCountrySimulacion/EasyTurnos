using DTOs;
using DTOs.Slot;

namespace Core.Services.Interfaces
{
    public interface ISlotService
    {
        Task<ServiceResponse<bool>> AddSlots(List<SlotAddDto> addSlots, Guid professionalId);
        Task<ServiceResponse<List<SlotGetDto>>> GetAllSlots(Guid professionalId);
        Task<ServiceResponse<bool>> DeleteSlots(Guid professionalId, List<Guid> slotIds);
    }
}
