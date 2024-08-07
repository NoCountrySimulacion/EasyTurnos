﻿using Domain.Entities;
using DTOs.Appointment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IAppointmentRepository : IGenericRepository<Appointment, Guid>
    {
        Task<List<AppointmentGetDto>> GetAllAppointmentsByProfessional(Guid professionalId);
        Task<List<AppointmentWithClientGetDto>> GetAllAppointmentsByClient(Guid clientId);
        Task<AppointmentGetDto> GetAppointmentByProfessional(Guid appointmentId, Guid professionalId);
        Task<AppointmentWithClientGetDto> GetAppointmentByClient(Guid appointmentId, Guid clientId);

    }
}
