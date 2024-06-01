using AutoMapper;
using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;

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
    }
}
