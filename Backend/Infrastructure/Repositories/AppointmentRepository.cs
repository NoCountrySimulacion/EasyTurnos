﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.Appointment;
using DTOs.Slot;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utilities.Enums;

namespace Infrastructure.Repositories
{
    public class AppointmentRepository : GenericRepository<Appointment, Guid>, IAppointmentRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AppointmentRepository(IMapper mapper, ApplicationDbContext context) : base(context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<List<AppointmentGetDto>> GetAllAppointmentsByProfessional(Guid professionalId)
        {
            return await GetAll()
                .Where(a => a.ProfessionalId == professionalId)
                .ProjectTo<AppointmentGetDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<List<AppointmentWithClientGetDto>> GetAllAppointmentsByClient(Guid clientId)
        {
            return await GetAll()
                .Where(a => a.ClientId == clientId)
                .ProjectTo<AppointmentWithClientGetDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<AppointmentGetDto> GetAppointmentByProfessional(Guid appointmentId, Guid professionalId)
        {
            var appointment = await Entities
                .Include(a => a.Client)
                .ThenInclude(c => c.ApplicationUser)
                .FirstOrDefaultAsync(a => a.Id.Equals(appointmentId) && a.ProfessionalId.Equals(professionalId));

            return appointment == null ?
                throw new KeyNotFoundException($"Appointment not found.") :
                _mapper.Map<AppointmentGetDto>(appointment);
        }

        public async Task<AppointmentWithClientGetDto> GetAppointmentByClient(Guid appointmentId, Guid clientId)
        {
            var appointment = await Entities
                .Include(a => a.Professional)
                .ThenInclude(c => c.ApplicationUser)
                .FirstOrDefaultAsync(a => a.Id.Equals(appointmentId) && a.ClientId.Equals(clientId));

            return appointment == null ?
                throw new KeyNotFoundException($"Appointment not found.") :
                _mapper.Map<AppointmentWithClientGetDto>(appointment);
        }

    }
}
