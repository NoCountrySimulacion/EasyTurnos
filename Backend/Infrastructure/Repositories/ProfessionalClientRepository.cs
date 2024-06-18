using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Repositories;

public class ProfessionalClientRepository : GenericRepository<ProfessionalClient, Guid>, IProfessionalClientRepository
{
    private readonly ApplicationDbContext _context;

    public ProfessionalClientRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<bool> AnyAsync(Expression<Func<ProfessionalClient, bool>> predicate)
    {
        return await _context.ProfessionalClients.AnyAsync(predicate);
    }

    public async Task<ProfessionalClient?> GetProfessionalClient(Guid professionalId, Guid clientId)
    {
        return await _context.ProfessionalClients
           .FirstOrDefaultAsync(pc => pc.ProfessionalId == professionalId && pc.ClientId == clientId);
    }
}