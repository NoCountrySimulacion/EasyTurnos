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

            CreateMap<Professional, ProfessionalGetDto>();
            CreateMap<Professional, ProfessionalWithSlotsDto>()
                    .ForMember(dest => dest.Slots, opt => opt.MapFrom(src => src.Slots));
        }

    }
}
