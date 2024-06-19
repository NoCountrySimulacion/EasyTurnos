using AutoMapper;
using Core.Behaviors;
using Core.Services.Interfaces;
using Domain.Entities;
using DTOs;
using DTOs.Appointment;
using DTOs.Payment;
using Infrastructure.Repositories;
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
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<PaymentService> _logger;
        private readonly IValidationBehavior<PaymentAddDto> _validationBehavior;

        public PaymentService(
            IPaymentRepository paymentRepository,
            IAppointmentRepository appointmentRepository,
            IMapper mapper,
            ILogger<PaymentService> logger,
            IValidationBehavior<PaymentAddDto> validationBehavior)
        {
            _paymentRepository = paymentRepository;
            _appointmentRepository = appointmentRepository;
            _mapper = mapper;
            _logger = logger;
            _validationBehavior = validationBehavior;
        }

        public async Task<ServiceResponse<PaymentGetDto>> AddPayment(Guid appointmentId, PaymentAddDto newPayment)
        {
            var serviceResponse = new ServiceResponse<PaymentGetDto>();

            try
            {
                var appointment = await _appointmentRepository.GetById(appointmentId);
                if (appointment == null)
                    throw new KeyNotFoundException($"Appointment with ID {appointmentId} not found.");
                if (appointment.PaymentId.HasValue)
                    throw new Exception($"Appointment already has a Payment.");

                await _validationBehavior.ValidateFields(newPayment);

                var payment = _mapper.Map<Payment>(newPayment);
                payment.AppointmentId = appointmentId;

                await _paymentRepository.Insert(payment);
                await _paymentRepository.SaveChangesAsync();

                appointment.PaymentId = payment.Id;
                await _appointmentRepository.SaveChangesAsync();

                serviceResponse.Message = $"Payment with Id {payment.Id} created.";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = $"Error adding Payment: {ex.Message}";
                _logger.LogError(ex, $"Error adding Payment - {ex.Message}");
            }

            return serviceResponse;
        }
    }
}
