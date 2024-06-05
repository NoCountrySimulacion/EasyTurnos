using AutoMapper;
using Core.Behaviors;
using Core.Services.Interfaces;
using Domain.Entities;
using DTOs;
using DTOs.Appointment;
using DTOs.Slot;
using Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utilities.Enums;

namespace Core.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<AppointmentService> _logger;
        private readonly IValidationBehavior<AppointmentAddDto> _validationBehavior;

        public AppointmentService(
            IAppointmentRepository appointmentRepository,
            IMapper mapper,
            ILogger<AppointmentService> logger,
            IValidationBehavior<AppointmentAddDto> validationBehavior)
        {
            _appointmentRepository = appointmentRepository;
            _mapper = mapper;
            _logger = logger;
            _validationBehavior = validationBehavior;
        }

        public async Task<ServiceResponse<List<AppointmentGetDto>>> AddAppointment(Guid clientId, Guid professionalId, AppointmentAddDto addAppointment)
        {
            var serviceResponse = new ServiceResponse<List<AppointmentGetDto>>();

            try
            {
                await _validationBehavior.ValidateFields(addAppointment);

                var newAppointment = _mapper.Map<Appointment>(addAppointment);
                newAppointment.ClientId = clientId;
                newAppointment.ProfessionalId = professionalId;
                newAppointment.Date = DateTime.Now;
                newAppointment.Status = Status.Pending;
                await _appointmentRepository.Insert(newAppointment);
                await _appointmentRepository.SaveChangesAsync();

                var dbAppointments = await _appointmentRepository.GetAllAppointmentsByProfessional(professionalId);

                serviceResponse.Data = dbAppointments;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<AppointmentGetDto>>> DeleteAppointment(Guid appointmentId, Guid professionalId)
        {
            var serviceResponse = new ServiceResponse<List<AppointmentGetDto>>();

            try
            {
                if (await _appointmentRepository.Delete(appointmentId))
                    await _appointmentRepository.SaveChangesAsync();
                else
                    throw new KeyNotFoundException($"Appointment with id {appointmentId} not found.");

                var dbAppointments = await _appointmentRepository.GetAllAppointmentsByProfessional(professionalId);

                serviceResponse.Data = dbAppointments;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<AppointmentGetDto>> GetAppointment(Guid appointmentId, Guid professionalId)
        {
            var serviceResponse = new ServiceResponse<AppointmentGetDto>();

            try
            {
                var dbAppointment = await _appointmentRepository.GetAppointmentByProfessional(appointmentId, professionalId);

                serviceResponse.Data = dbAppointment;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<AppointmentGetDto>>> GetAppointments(Guid professionalId, AppointmentFilterDto appointmentFilter)
        {
            var serviceResponse = new ServiceResponse<List<AppointmentGetDto>>();

            try
            {
                var dbAppointment = await _appointmentRepository.GetFilteredAppointments(professionalId, appointmentFilter);

                serviceResponse.Data = dbAppointment;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }

            return serviceResponse;
        }
    }
}
