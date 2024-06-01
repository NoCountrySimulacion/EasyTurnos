using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.Appointment;
using DTOs.Slot;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

    }
}
