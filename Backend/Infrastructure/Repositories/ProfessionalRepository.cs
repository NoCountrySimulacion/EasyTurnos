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
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public ProfessionalRepository(IMapper mapper, ApplicationDbContext context) : base(context)
        {
            _mapper = mapper;
            this._context = context;
        }

        // Overriding method from GenericRepository to use ProjectTo instead of db class.
        public new async Task<ProfessionalGetDto?> GetProfessionalById(Guid id)
        {
            return await Entities
                .ProjectTo<ProfessionalGetDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public new async Task<List<ProfessionalGetDto>> GetAllProfessionalsWithSlots()
        {
            var professionals = await Entities
                    .ProjectTo<ProfessionalGetDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

            return professionals;
        }

        public new async Task<List<ProfessionalGetDto>> GetAllProfessionalsByClientId(Guid clientId)
        {
            var professionals = await Entities
            .Include(p => p.ProfessionalClients)
            .Include(p => p.ApplicationUser)
            .Where(p => p.ProfessionalClients.Any(pc => pc.ClientId == clientId))
            .ProjectTo<ProfessionalGetDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

            return professionals;
        }

        public new async Task<Professional> Update(Professional entity)
        {
            var result = Entities.Update(entity);

            return result.Entity;
        }
    }
}
