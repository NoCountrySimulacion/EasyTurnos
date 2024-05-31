using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.Professional;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ProfessionalRepository : GenericRepository<Professional, Guid>, IProfessionalRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ProfessionalRepository(IMapper mapper, ApplicationDbContext context) : base(context)
        {
            _mapper = mapper;
        }

        // Overriding method from GenericRepository to use ProjectTo instead of db class.
        public new async Task<ProfessionalGetDto?> GetById(Guid id)
        {
            return await Entities
                .ProjectTo<ProfessionalGetDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public new async Task<List<ProfessionalGetDto>> GetAll()
        {
            var professionals = await Entities
                    .ProjectTo<ProfessionalGetDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

            return professionals;
        }
    }
}
