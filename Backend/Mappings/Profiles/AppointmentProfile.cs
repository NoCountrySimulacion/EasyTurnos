using AutoMapper;
using Domain.Entities;
using DTOs.Appointment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mappings.Profiles
{
    public class AppointmentProfile : Profile
    {
        public AppointmentProfile()
        {
            CreateMap<AppointmentAddDto, Appointment>();
            CreateMap<Appointment, AppointmentGetDto>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.Client.ApplicationUser.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.Client.ApplicationUser.LastName));
            CreateMap<Appointment, AppointmentWithClientGetDto>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.Professional.ApplicationUser.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.Professional.ApplicationUser.LastName))
                .ForMember(dest => dest.Speciality, opt => opt.MapFrom(src => src.Professional.Speciality));
        }
    }
}
