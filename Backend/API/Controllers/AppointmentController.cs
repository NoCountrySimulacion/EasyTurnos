using Core.Services;
using Core.Services.Interfaces;
using DTOs.Slot;
using DTOs;
using Microsoft.AspNetCore.Mvc;
using DTOs.Appointment;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _appointmentService;

        public AppointmentController(IAppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [HttpPost("{clientId}/{professionalId}")]
        public async Task<ActionResult<ServiceResponse<AppointmentGetDto>>> AddAppointment(Guid clientId, Guid professionalId, AppointmentAddDto newAppointment)
        {
            return Ok(await _appointmentService.AddAppointment(clientId, professionalId, newAppointment));
        }

        [HttpDelete("{appointmentId}")]
        public async Task<ActionResult<ServiceResponse<AppointmentGetDto>>> DeleteAppointment(Guid appointmentId)
        {
            return Ok(await _appointmentService.DeleteAppointment(appointmentId));
        }

        [HttpGet("{appointmentId}/{professionalId}")]
        public async Task<ActionResult<ServiceResponse<AppointmentGetDto>>> GetAppointment(Guid appointmentId, Guid professionalId)
        {
            return Ok(await _appointmentService.GetAppointment(appointmentId, professionalId));
        }

        [HttpGet("byClientOrProfessional/{userId}")]
        public async Task<ActionResult<ServiceResponse<List<object>>>> GetAppointments(Guid userId)
        {
            return Ok(await _appointmentService.GetAppointments(userId));
        }
    }
}
