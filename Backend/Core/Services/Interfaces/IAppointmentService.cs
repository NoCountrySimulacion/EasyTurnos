﻿using DTOs.Appointment;
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
        Task<ServiceResponse<AppointmentGetDto>> DeleteAppointment(Guid appointmentId, Guid professionalId);
        Task<ServiceResponse<AppointmentGetDto>> GetAppointment(Guid appointmentId, Guid professionalId);
        Task<ServiceResponse<List<AppointmentGetDto>>> GetAppointments(Guid professionalId);
    }
}
