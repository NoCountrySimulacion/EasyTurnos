using AutoMapper;
using Domain.Entities;
using DTOs.Client;

namespace Mappings.Profiles;

public class ClientProfile : Profile
{
    public ClientProfile()
    {
        CreateMap<ClientAddDto, Client>().ReverseMap();
        
        CreateMap<Client, ClientGetDto>()
           .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.ApplicationUser.Email))
           .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.ApplicationUser.PhoneNumber))
           .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.ApplicationUser.FirstName))
           .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.ApplicationUser.LastName));
        
        CreateMap<Client, ClientListDto>()
          .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.ApplicationUser.FirstName))
          .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.ApplicationUser.LastName))
          .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.ApplicationUser.PhoneNumber));

        CreateMap<Client, ClientUpdateResponse>().ReverseMap();

        CreateMap<ClientUpdateResponse, ClientGetDto>()
          .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.ApplicationUser.FirstName))
          .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.ApplicationUser.LastName))
          .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.ApplicationUser.Email))
          .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.ApplicationUser.PhoneNumber));

    }
}
