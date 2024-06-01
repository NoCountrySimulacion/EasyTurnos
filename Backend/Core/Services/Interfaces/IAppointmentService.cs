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
        Task<ServiceResponse<List<AppointmentGetDto>>> AddAppointment(Guid clientId, Guid professionalId, AppointmentAddDto addAppointment);
    }
}
