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
        private readonly IProfessionalRepository _professionalRepository;
        private readonly IClientRepository _clientRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<AppointmentService> _logger;
        private readonly IValidationBehavior<AppointmentAddDto> _validationBehavior;

        public AppointmentService(
            IAppointmentRepository appointmentRepository,
            IProfessionalRepository professionalRepository,
            IClientRepository clientRepository,
            IMapper mapper,
            ILogger<AppointmentService> logger,
            IValidationBehavior<AppointmentAddDto> validationBehavior)
        {
            _appointmentRepository = appointmentRepository;
            _professionalRepository = professionalRepository;
            _clientRepository = clientRepository;
            _mapper = mapper;
            _logger = logger;
            _validationBehavior = validationBehavior;
        }

        public async Task<ServiceResponse<AppointmentGetDto>> AddAppointment(Guid clientId, Guid professionalId, AppointmentAddDto addAppointment)
        {
            var serviceResponse = new ServiceResponse<AppointmentGetDto>();

            try
            {
                await _validationBehavior.ValidateFields(addAppointment);

                var newAppointment = _mapper.Map<Appointment>(addAppointment);
                newAppointment.ClientId = clientId;
                newAppointment.ProfessionalId = professionalId;
                newAppointment.Date = DateTime.Now;
                await _appointmentRepository.Insert(newAppointment);
                await _appointmentRepository.SaveChangesAsync();

                serviceResponse.Message = $"Appointment with Id {newAppointment.Id} created.";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, $"Error adding Appointment - {ex.Message}");
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<AppointmentGetDto>> DeleteAppointment(Guid appointmentId, Guid professionalId)
        {
            var serviceResponse = new ServiceResponse<AppointmentGetDto>();

            try
            {
                if (await _appointmentRepository.Delete(appointmentId))
                    await _appointmentRepository.SaveChangesAsync();
                else
                    throw new KeyNotFoundException($"Appointment not found. Check both IDs.");

                serviceResponse.Message = $"Appointment deleted.";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, $"Error deleting Appointment - {ex.Message}");
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
                _logger.LogError(ex, $"Error getting Appointment - {ex.Message}");
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<object>>> GetAppointments(Guid userId)
        {
            var serviceResponse = new ServiceResponse<List<object>>();
            List<object> appointments = new List<object>();

            try
            {
                var professional = await _professionalRepository.GetById(userId);
                if (professional != null)
                {
                    appointments = (await _appointmentRepository.GetAllAppointmentsByProfessional(userId)).Cast<object>().ToList();
                }
                else
                {
                    var client = await _clientRepository.GetById(userId);
                    if (client != null)
                    {
                        appointments = (await _appointmentRepository.GetAllAppointmentsByClient(userId)).Cast<object>().ToList();
                    }
                    else
                    {
                        throw new KeyNotFoundException("User not found.");
                    }
                }

                if (appointments.Count == 0)
                    serviceResponse.Message = "No appointments found.";
                else
                    serviceResponse.Data = appointments;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, $"Error getting Appointments - {ex.Message}");
            }

            return serviceResponse;
        }

    }
}
