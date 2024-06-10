using AutoMapper;
using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;

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
}
