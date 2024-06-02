using Core.Services.Interfaces;
using DTOs;
using DTOs.Identity;
using DTOs.Professional;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
   //[Authorize(Roles = "Admin")]
   [Route("api/[controller]")]
    [ApiController]
    public class ProfessionalController : ControllerBase
    {
        private readonly IProfessionalService _professionalService;
        public ProfessionalController(IProfessionalService professionalService)
        {
            _professionalService = professionalService;
        }

        [HttpGet("GetById/{professionalId}")]
        public async Task<ActionResult> GetProfessionalById(Guid professionalId)
        {
            var result = await _professionalService.GetProfessionalById(professionalId);
            if (result != null)
                return Ok(result);
            else
                return NotFound(new { message = $"Professional with ID {professionalId} not found." });
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<ProfessionalWithSlotsDto>>>> GetAllProfessionalsWithSlots()
        {
            return Ok(await _professionalService.GetAllProfessionalsWithSlots());
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<RegistrationResponse>>> AddProfessional(ProfessionalAddDto newProfessional)
        {
            return Ok(await _professionalService.RegisterProfessionalUser(newProfessional));
        }

        [HttpDelete]
        public async Task<ActionResult<ServiceResponse<ProfessionalAddDto>>> DeleteProfessional(Guid id)
        {
            return Ok(await _professionalService.DeleteProfessional(id));
        }
    }
}
