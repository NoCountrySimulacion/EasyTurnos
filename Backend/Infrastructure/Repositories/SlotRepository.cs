﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.Slot;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class SlotRepository : GenericRepository<Slot, Guid>, ISlotRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public SlotRepository(IMapper mapper, ApplicationDbContext context) : base(context)
        {
            _mapper = mapper;
        }

        // Overriding method from GenericRepository to use ProjectTo instead of db class.
        public async Task<List<SlotGetDto>> GetAllSlots(Guid professionalId)
        {
            return await GetAll()
                .Where(s => s.ProfessionalId == professionalId)
                .ProjectTo<SlotGetDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
        }

        public async Task<bool> DeleteSlots(Guid professionalId, List<Guid> slotIds)
        {
            var dbEntities = await Entities
                .Where(e => slotIds.Contains(e.Id) && e.ProfessionalId == professionalId)
                .ToListAsync();

            if (dbEntities.Count > 0)
            {
                Entities.RemoveRange(dbEntities);
            }

            return dbEntities.Count > 0;
        }

        public async Task<bool> DeleteAllSlotsByProfessionalId(Guid professionalId)
        {
            var dbEntities = await Entities
                .Where(e => e.ProfessionalId == professionalId)
                .ToListAsync();

            if (dbEntities.Count > 0)
            {
                Entities.RemoveRange(dbEntities);
            }

            return dbEntities.Count > 0;
        }
    }
}
