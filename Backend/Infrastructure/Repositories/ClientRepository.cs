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

    public Task<ClientCreatedDto> Insert(ClientAddDto clientAddDto)
    {
        throw new NotImplementedException();
    }

    //public async Task AddAsync(Client client)
    //{
    //    await _context.Clients.AddAsync(client);
    //    await _context.SaveChangesAsync();
    //}

    // Overriding method from GenericRepository to use ProjectTo instead of db class.
    //public new async Task<ProfessionalGetDto?> GetById(Guid id)
    //{
    //    return await Entities
    //        .ProjectTo<ProfessionalGetDto>(_mapper.ConfigurationProvider)
    //        .FirstOrDefaultAsync(x => x.Id == id);
    //}

    //public async Task<ClientCreatedDto> Insert(Client client)
    //{
    //    await _context.Clients.AddAsync(client);
    //    await _context.SaveChangesAsync();
    //    return await Entities
    //        .ProjectTo<ClientCreatedDto>(_mapper.ConfigurationProvider)
    //        .FirstOrDefaultAsync(c => c.Id == id);
    //}
}
