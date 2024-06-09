using AutoMapper;
using Domain.Entities;
using DTOs.Professional;

namespace Mappings.Profiles
{
    public class ProfessionalProfile : Profile
    {
        public ProfessionalProfile()
        {
            CreateMap<ProfessionalAddDto, Professional>();

            CreateMap<Professional, ProfessionalGetDto>()
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.ApplicationUser.PhoneNumber))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.ApplicationUser.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.ApplicationUser.LastName));
        }

    }
}
