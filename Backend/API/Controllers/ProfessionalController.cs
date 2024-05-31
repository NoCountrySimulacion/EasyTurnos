using Core.Services.Interfaces;
using DTOs;
using DTOs.Professional;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
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
        public async Task<ActionResult<ServiceResponse<List<ProfessionalGetDto>>>> GetAllProfessionals()
        {
            return Ok(await _professionalService.GetAllProfessionals());
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<ProfessionalGetDto>>>> AddProfessional(ProfessionalAddDto newProfessional)
        {
            return Ok(await _professionalService.AddProfessional(newProfessional));
        }
    }
}
