using AutoMapper;
using Domain.Entities;
using DTOs.Client;

namespace Mappings.Profiles;

public class ClientProfile : Profile
{
    public ClientProfile()
    {
        CreateMap<ClientAddDto, Client>().ReverseMap();
        CreateMap<Client, ClientCreatedDto>();
    }
}
