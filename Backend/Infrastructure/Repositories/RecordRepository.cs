using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.Record;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class RecordRepository : GenericRepository<Record, Guid>, IRecordRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public RecordRepository(ApplicationDbContext context, IMapper mapper) : base(context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<RecordGetDto>> GetAllRecords(Guid professionalId, Guid clientId)
        {
            return await GetAll()
                .Where(r => r.ProfessionalId == professionalId && r.ClientId == clientId)
                .ProjectTo<RecordGetDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}
