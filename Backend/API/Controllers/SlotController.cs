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
            var claim = HttpContext.User.Claims.Where(c => c.Type == "professionalid").FirstOrDefault();
            return new Guid(claim.Value);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<SlotGetDto>>>> AddSlot(SlotAddDto newSlot, Guid Id)
        {            
            var professionalId = GetCurrentProfessionalId();

            return Ok(await _slotService.AddSlot(newSlot, professionalId));
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<SlotGetDto>>>> GetAllSlots()
        {
            var professionalId = GetCurrentProfessionalId();

            return Ok(await _slotService.GetAllSlots(professionalId));
        }

        [HttpDelete]
        public async Task<ActionResult<ServiceResponse<List<SlotGetDto>>>> DeleteSlot(Guid slotId)
        {
            var professionalId = GetCurrentProfessionalId();

            return Ok(await _slotService.DeleteSlot(professionalId, slotId));
        }
    }
}
