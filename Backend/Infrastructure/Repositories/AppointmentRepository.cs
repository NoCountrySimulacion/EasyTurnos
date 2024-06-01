using AutoMapper;
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

        public async Task<AppointmentGetDto> GetAppointmentByProfessional(Guid appointmentId, Guid professionalId)
        {
            var appointment = await Entities.FirstOrDefaultAsync(a => a.Id.Equals(appointmentId) && a.ProfessionalId.Equals(professionalId));

            return appointment == null ?
                throw new KeyNotFoundException($"Appointment not found.") :
                _mapper.Map<AppointmentGetDto>(appointment);
        }

        public async Task<List<AppointmentGetDto>> GetFilteredAppointments(Guid professionalId, AppointmentFilterDto appointmentFilter)
        {
            var appointments = await GetAll()
                .Where(a => a.ProfessionalId == professionalId)
                .ProjectTo<AppointmentGetDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            //Filters
            int maxEnumLength = Enum.GetValues(typeof(Status)).Length;

            if (appointmentFilter.Status >= 0 && appointmentFilter.Status < maxEnumLength)
                appointments = appointments.Where(a => a.Status.Equals((Status)appointmentFilter.Status)).ToList();

            if (appointmentFilter.SoonFirst.HasValue)
                appointments = appointmentFilter.SoonFirst.Value ?
                    appointments.OrderBy(a => a.SlotDate).ToList() :
                    appointments;

            return appointments.IsNullOrEmpty() ?
                throw new KeyNotFoundException($"Appointments not found.") :
                appointments;
        }

    }
}
