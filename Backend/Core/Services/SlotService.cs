using AutoMapper;
using Core.Services.Interfaces;
using Domain.Entities;
using DTOs;
using DTOs.Slot;
using Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Logging;

namespace Core.Services
{
    public class SlotService : ISlotService
    {

        private readonly IMapper _mapper;
        private readonly ISlotRepository _slotRepository;
        private readonly ILogger<SlotService> _logger;

        public SlotService(IMapper mapper, ISlotRepository slotRepository, ILogger<SlotService> logger)
        {
            _mapper = mapper;
            _slotRepository = slotRepository;
            _logger = logger;
        }

        public async Task<ServiceResponse<List<SlotGetDto>>> AddSlot(SlotAddDto addSlot, Guid professionalId)
        {
            var serviceResponse = new ServiceResponse<List<SlotGetDto>>();

            try
            {
                var newSlot = _mapper.Map<Slot>(addSlot);
                newSlot.ProfessionalId = professionalId;
                await _slotRepository.Insert(newSlot);
                await _slotRepository.SaveChangesAsync();

                var dbSlots = await _slotRepository.GetAllSlots(professionalId);

                serviceResponse.Data = dbSlots;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<SlotGetDto>>> DeleteSlot(Guid professionalId, Guid slotId)
        {
            var serviceResponse = new ServiceResponse<List<SlotGetDto>>();

            try
            {
                if (await _slotRepository.Delete(slotId))
                    await _slotRepository.SaveChangesAsync();

                serviceResponse.Data = await _slotRepository.GetAllSlots(professionalId);
            }
            catch (Exception ex) 
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<SlotGetDto>>> GetAllSlots(Guid professionalId)
        {
            var serviceResponse = new ServiceResponse<List<SlotGetDto>>();

            try
            {
                serviceResponse.Data = await _slotRepository.GetAllSlots(professionalId);
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
