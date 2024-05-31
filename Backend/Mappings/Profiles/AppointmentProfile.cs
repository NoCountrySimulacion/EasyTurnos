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
            CreateMap<Appointment, AppointmentGetDto>();
        }
    }
}
