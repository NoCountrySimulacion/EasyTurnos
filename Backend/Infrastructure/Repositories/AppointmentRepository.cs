using AutoMapper;
using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
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
        }
    }
}
