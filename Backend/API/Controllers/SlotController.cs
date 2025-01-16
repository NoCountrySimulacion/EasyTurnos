using Core.Services.Interfaces;
using DTOs;
using DTOs.Slot;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlotController : ControllerBase
    {
        private readonly ISlotService _slotService;

        public SlotController(ISlotService slotService)
        {
            _slotService = slotService;
        }

        private Guid GetCurrentProfessionalId()
        {
            var claim = HttpContext.User.Claims.Where(c => c.Type == "professionalId").FirstOrDefault();
            return new Guid(claim.Value);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<bool>>> AddSlots(List<SlotAddDto> newSlots)
        {
            var professionalId = GetCurrentProfessionalId();

            return Ok(await _slotService.AddSlots(newSlots, professionalId));
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<SlotGetDto>>>> GetAllSlots()
        {
            var professionalId = GetCurrentProfessionalId();

            return Ok(await _slotService.GetAllSlots(professionalId));
        }

        [HttpDelete]
        public async Task<ActionResult<ServiceResponse<bool>>> DeleteSlots(List<Guid> slotIds)
        {
            var professionalId = GetCurrentProfessionalId();

            return Ok(await _slotService.DeleteSlots(professionalId, slotIds));
        }

        [HttpDelete("DeleteAllByProfessionalId")]
        public async Task<ActionResult<ServiceResponse<bool>>> DeleteAllSlotsByProfessionalId()
        {
            var professionalId = GetCurrentProfessionalId();

            return Ok(await _slotService.DeleteAllSlotsByProfessionalId(professionalId));
        }
    }
}
