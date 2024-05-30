﻿using Domain.Entities;
using DTOs.Professional;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IProfessionalRepository : IGenericRepository<Professional, Guid>
    {
        public new Task<ProfessionalGetDto?> GetById(Guid id);
    }
}
