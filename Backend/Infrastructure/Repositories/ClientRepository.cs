using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.Client;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ClientRepository : GenericRepository<Client, Guid>, IClientRepository
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;


    public ClientRepository(ApplicationDbContext context, IMapper mapper) : base(context)
    {
        _context = context;
        _mapper = mapper;
    }

    public new async Task<ClientGetDto?> GetById(Guid id)
    {
        return await Entities
            //.Include(c => c.ApplicationUser)
            .ProjectTo<ClientGetDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id == id);
    }


}
