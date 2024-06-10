using DTOs.Appointment;
using DTOs;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services.Interfaces
{
    public interface IAppointmentService
    {
        Task<ServiceResponse<AppointmentGetDto>> AddAppointment(Guid clientId, Guid professionalId, AppointmentAddDto addAppointment);
        Task<ServiceResponse<AppointmentGetDto>> DeleteAppointment(Guid appointmentId);
        Task<ServiceResponse<AppointmentGetDto>> GetAppointment(Guid appointmentId, Guid professionalId);
        Task<ServiceResponse<List<object>>> GetAppointments(Guid userId);
    }
}
