using AutoMapper;
using Domain.Entities;
using DTOs.Slot;

namespace Mappings.Profiles
{
    public class SlotProfile : Profile
    {
        public SlotProfile()
        {
            CreateMap<SlotAddDto, Slot>();
            CreateMap<Slot, SlotGetDto>();
            CreateMap<SlotEditDto, Slot>().ReverseMap();
        }
    }
}
