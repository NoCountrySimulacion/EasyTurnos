using Core.Services;
using Core.Services.Interfaces;
using DTOs.Slot;
using DTOs;
using Microsoft.AspNetCore.Mvc;
using DTOs.Appointment;
using System.ComponentModel.DataAnnotations;

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

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<AppointmentGetDto>>>> AddAppointment([Required]Guid clientId, [Required]Guid professionalId, AppointmentAddDto newAppointment)
        {
            return Ok(await _appointmentService.AddAppointment(clientId, professionalId, newAppointment));
        }

        [HttpDelete]
        public async Task<ActionResult<ServiceResponse<List<AppointmentGetDto>>>> DeleteAppointment(Guid appointmentId, Guid professionalId)
        {
            return Ok(await _appointmentService.DeleteAppointment(appointmentId, professionalId));
        }

        [HttpGet("{appointmentId}/{professionalId}")]
        public async Task<ActionResult<ServiceResponse<AppointmentGetDto>>> GetAppointment(Guid appointmentId, Guid professionalId)
        {
            return Ok(await _appointmentService.GetAppointment(appointmentId, professionalId));
        }

        [HttpGet("{professionalId}")]
        public async Task<ActionResult<ServiceResponse<List<AppointmentGetDto>>>> GetAppointments(Guid professionalId, [FromQuery]AppointmentFilterDto appointmentFilter)
        {
            return Ok(await _appointmentService.GetAppointments(professionalId, appointmentFilter));
        }
    }
}
