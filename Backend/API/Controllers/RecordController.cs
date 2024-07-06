using Core.Services.Interfaces;
using DTOs;
using DTOs.Record;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //[Authorize(Roles = "Professional")]
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

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<RecordGetDto>>>> GetRecords(Guid clientId)
        {
            var professionalId = GetCurrentProfessionalId();

            return Ok(await _recordService.GetAllRecords(professionalId, clientId));
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<bool>>> AddRecord(RecordAddDto newRecord)
        {
            var professionalId = GetCurrentProfessionalId();

            return Ok(await _recordService.AddRecord(newRecord, professionalId));
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<bool>>> EditRecord(Guid recordId, RecordUpdateDto updatedRecord)
        {
            if (recordId != updatedRecord.Id)
            {
                return BadRequest();
            }
            return Ok(await _recordService.UpdateRecord(recordId, updatedRecord));
        }

        [HttpDelete]
        public async Task<ActionResult<ServiceResponse<bool>>> DeleteRecord(Guid recordId)
        {
            var professionalId = GetCurrentProfessionalId();

            return Ok(await _recordService.DeleteRecord(professionalId, recordId));

        }

    }
}
