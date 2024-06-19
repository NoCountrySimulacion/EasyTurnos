using AutoMapper;
using Domain.Entities;
using DTOs.Appointment;
using DTOs.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mappings.Profiles
{
    public class PaymentProfile : Profile
    {
        public PaymentProfile()
        {
            CreateMap<PaymentAddDto, Payment>();
            CreateMap<Payment, PaymentGetDto>();
        }

    }
}
