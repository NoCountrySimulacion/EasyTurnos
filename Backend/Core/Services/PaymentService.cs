using AutoMapper;
using Core.Behaviors;
using Core.Services.Interfaces;
using DTOs.Appointment;
using Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _paymentRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<AppointmentService> _logger;
        private readonly IValidationBehavior<AppointmentAddDto> _validationBehavior;

        public PaymentService(
            IPaymentRepository paymentRepository,
            IMapper mapper,
            ILogger<AppointmentService> logger,
            IValidationBehavior<AppointmentAddDto> validationBehavior)
        {
            _paymentRepository = paymentRepository;
            _mapper = mapper;
            _logger = logger;
            _validationBehavior = validationBehavior;
        }
    }
}
