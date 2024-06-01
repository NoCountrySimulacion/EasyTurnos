using AutoMapper;
using Domain.Entities;
using DTOs.Record;

namespace Mappings.Profiles
{
    public class RecordProfile : Profile
    {
        public RecordProfile()
        {
            CreateMap<RecordAddDto, Record>();
            CreateMap<RecordGetDto, Record>();
            CreateMap<RecordUpdateDto, Record>().ReverseMap();
        }
    }
}
