using Core.Services.Interfaces;
using DTOs;
using DTOs.Record;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecordController : ControllerBase
    {
        private readonly IRecordService _recordService;

        public RecordController(IRecordService recordService)
        {
            _recordService = recordService;
        }

        private Guid GetCurrentProfessionalId()
        {
            var claim = HttpContext.User.Claims.Where(c => c.Type == "professionalid").FirstOrDefault();
            return new Guid(claim.Value);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<RecordGetDto>>>> AddRecord(RecordAddDto newRecord)
        {
            var professionalId = GetCurrentProfessionalId();

            return Ok(await _recordService.AddRecord(newRecord, professionalId));
        }
    }
}
